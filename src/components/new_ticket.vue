<template>
  <div class="grid-x">
    <div class="cell">
      <fieldset class="fieldset">
        <legend>
          <strong>{{$t("submit_ticket_title")}}</strong>
        </legend>
        <form @submit.prevent="ask">
          <div class="callout" :class="msg_class">
            <h5>{{msg}}</h5>
          </div>
          <div class="grid-x grid-margin-x medium-up-3">
            <div class="cell">
              <label class="height_holder">{{$t("ticket_id")}}:
              </label>
              <div class="height_holder">
                <strong>{{init_data.id}}</strong>
              </div>
            </div>
            <div class="cell">
              <label>{{$t("ticket_email")}}
                <em>*</em>
              </label>
              <input type="email" v-model="email" placeholder="javy@gamepip.com" required="required" pattern="^([^@ ]+)@((?:[-a-z0-9]+.)+[a-z]{2,})$" name='email' />
            </div>
            <div class="cell">
              <label>{{$t("ticket_topic")}}
                <em>*</em>
              </label>
              <select required="required" v-model="qa_cate_id" name="qa_cate_id">
                <option value="">{{$t("ticket_select")}}</option>
                <option v-for="item in user_cates" :key="item.id" :value="item.id">{{item.name}}</option>
              </select>
            </div>
          </div>
          <div class="grid-x  grid-margin-x">
            <div class="cell medium-4">
              <label>{{$t("issue_time")}}
                <em>*</em>
              </label>
              <input type="datetime-local" v-model="issure_time" required="required" name="issure_time" />
            </div>
            <div class="cell medium-8">
              <label>{{$t("upload_pic")}}
                <em>&nbsp;</em>
              </label>
              <div class='grid-x'>
                <div class="cell medium-5">
                  <img-inputer auto-upload v-model="file" theme="light" size="small"  :bottom-text="$t('upload_pic')" accept="image/png,image/gif,image/jpeg" :action="global.UploadUrl" :on-error="onErr" :on-success="fileChange" :placeholder="$t('upload_pic')"/>
                </div>
                <div class="cell img_list medium-7">
                  <img :src="item" alt=""  v-for="(item,idx) in files" :key="idx">
                </div>
              </div>
            </div>
          </div>
          <div class="grid-x">
            <div class="cell">
              <label>{{$t("ticket_detail")}}
                <em>*</em>
                <small> {{$t("td_des")}} </small>
                <em>*</em>
              </label>
              <textarea :placeholder="$t('new_q_detail')" required="required" v-model="question" id="en_qa_question" name="question">
              </textarea>
            </div>
          </div>
          <blockquote>{{$t("td_promise")}}</blockquote>
          <div class="callout" :class="msg_class">
            <h5>{{msg}}</h5>
          </div>
          <div class="actions">
            <input type="submit" name="commit" :value="$t('ticket_btn')" class="button tiny" />
          </div>
        </form>
      </fieldset>
    </div>
  </div>
</template>

<script>
/*
http://m.pipgame.com/en_qas/new?id=xxx&name=xxx&p_name=xxx&game_id=xxx
http://localhost:8080/#/new_ticket?id=10000&name=xxx&p_name=xxx&game_id=19&acc_name=xxx&version=0.1.0&lang=en
http://192.168.0.252:7092/#/new_ticket?id=10000&name=xxx&p_name=xxx&game_id=19&acc_name=xxx&version=0.1.0&lang=en
http://qa.gamepip.com/#/new_ticket?id=10000&name=xxx&p_name=xxx&game_id=26&acc_name=xxx&version=0.1.0&lang=en
id: 账号id
name: 角色名
p_name:分区名
game_id: 游戏充值id

客户端添加
acc_name：账号名
version：客户端版本号
lang：语言
*/
import dateformat from 'dateformat';
import ImgInputer from 'vue-img-inputer';
import 'vue-img-inputer/dist/index.css';

export default {
  name: 'new_ticket',
  data() {
    return {
      email: null,
      qa_cate_id: '',
      question: null,
      user_cates: null,
      msg: null,
      files: [],
      file: null,
      msg_class: 'hide',
      issure_time: dateformat(new Date(), "yyyy-mm-dd'T'HH:MM:'00'")
    };
  },
  created() {
    this.global.getUserCates().then(
      function(res) {
        this.user_cates = res;
      }.bind(this)
    );
  },
  computed: {
    init_data: function() {
      return this.$localStorage.init_data;
    }
  },
  components: {
    ImgInputer
  },
  methods: {
    fileChange(res, file) {
      this.files.push(res.img_url);
      // console.log('res --> ', res);
      // console.log('file -->', file);
    },
    onErr(err, file) {
      console.log('err', err);
    },
    ask() {
      console.log('form is submit', this.files);

      let data = {
        qa: {
          game_role_id: this.init_data.id,
          game_role_name: this.init_data.name,
          game_user_name: this.init_data.acc_name,
          game_server_name: this.init_data.p_name,
          qa_cate_id: this.qa_cate_id,
          question: this.question,
          email: this.email,
          issure_time: this.issure_time,
          files: this.files
        },
        game_id: this.init_data.game_id
      };
      this.$http
        .post('/en_qas', data)
        .then(res => {
          // console.log('then back');
          if (res.data.code === 'failed') {
            // 提交出错
            this.msg = this.$i18n.t('submit_failed');
            this.msg_class = 'alert';
          } else {
            // 提交成功
            this.msg = this.$i18n.t('submit_success');
            this.msg_class = 'success';
            this.qa_cate_id = null;
            this.question = null;
            this.files = [];
            this.file = null;
          }
        })
        .catch(error => {
          // console.log('catch back', arguments);
          if (error.response) {
            this.msg = error.response.data.error;
          } else if (error.request) {
            this.msg = this.$i18n.t('error_request');
          } else {
            this.msg = error.message;
          }
          this.msg_class = 'alert';
        });
    }
  }
};
</script>

<style lang="scss">
.img_list img{
  vertical-align: top;
  width:70px;
  padding-right:4px;
}
</style>


