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
              <label class="height_holder">{{$t("new_q_id")}}: <strong>{{init_data.id}}</strong>
              </label>
              <p>{{$t("new_q_des")}}</p>
            </div>
            <div class="cell">
              <label>{{$t("new_q_role_name")}}
                <em>*</em>
              </label>
              <input type='text' v-model="role_name" placeholder="xxx" required="required" />
            </div>
            <div class="cell">
              <label>{{$t("new_q_time")}}
                <em>*</em>
              </label>
              <input type='datetime-local' v-model="issue_time" placeholder="MM/DD/YYYY" required="required" />
            </div>
            <div class="cell">
              <label>{{$t("ticket_email")}}
                <em>*</em>
              </label>
              <input type="email" v-model="email" placeholder="javy@pearlinpalm.com" required="required" pattern="^([^@ ]+)@((?:[-a-z0-9]+.)+[a-z]{2,})$" />
            </div>

          </div>
          <div class="grid-x">
            <div class="cell">
              <label>{{$t("ticket_detail")}}
                <em>*</em>
                <small> {{$t("td_des")}} </small>
                <em>*</em>
              </label>
              <textarea placeholder="Detail" required="required" v-model="question" id="en_qa_question">
              </textarea>
            </div>
          </div>
          <blockquote>{{$t("td_promise")}}</blockquote>
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
id: 账号id
name: 角色名
p_name:分区名
game_id: 游戏充值id

客户端添加
acc_name：账号名
version：客户端版本号
lang：语言
*/
export default {
  name: 'new_ticket',
  data() {
    return {
      email: null,
      role_name: '',
      question: null,
      issue_time: null,
      msg: null,
      msg_class: 'hide'
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
      console.log('调用计算属性');
      return this.$localStorage.init_data;
    }
  },
  methods: {
    ask() {
      console.log('form is submit');

      let data = {
        qa: {
          game_role_id: this.init_data.id,
          game_role_name: this.role_name,
          game_user_name: this.init_data.acc_name,
          issure_time: this.issue_time,
          question: this.question,
          email: this.email
        },
        game_id: this.init_data.game_id
      };
      this.$http
        .post('/en_qas/new_question', data)
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
            this.role_name = null;
            this.issue_time = null;
            this.email = null;
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

</style>


