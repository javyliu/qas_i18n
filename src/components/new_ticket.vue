<template>
  <div class="grid-x">
    <div class="cell">
      <fieldset class="fieldset">
        <legend>
          <strong>SUBMIT TICKET</strong>
        </legend>
        <form class="new_en_qa" id="new_en_qa">
          <div class="grid-x grid-margin-x medium-up-3">
            <div class="cell">
              <label class="height_holder">ID:
                <strong>{{id}}</strong>
              </label>
            </div>
            <div class="cell">
              <label>Email Address
                <em>*</em>
              </label>
              <input type="email" placeholder="javy@pearlinpalm.com" required="required" pattern="^([^@ ]+)@((?:[-a-z0-9]+.)+[a-z]{2,})$" id="en_qa_email" />
            </div>
            <div class="cell">
              <label>Topic
                <em>*</em>
              </label>
              <select required="required">
                <option value="">Make a Selection</option>
                <option value="16"> ฉันล็อกอินไม่ได้แล้ว </option>
                <option value="17">บัญชีของฉันมีปัญหา</option>
                <option value="19">ฉันมีปัญหาตอนซื้อ</option>
                <option value="20">ปัญหาอื่นๆ</option>
              </select>
            </div>
          </div>
          <div class="grid-x">
            <div class="cell">
              <label>Detail
                <em>*</em>
                <small> Use a few words(0~400) to summarize your issue </small>
                <em>*</em>
              </label>
              <textarea placeholder="Detail" required="required" name="en_qa[question]" id="en_qa_question">
              </textarea>
            </div>
          </div>
          <blockquote>Will respond by email within 24 hours</blockquote>
          <div class="actions">
            <input type="submit" name="commit" value="SUBMIT A TICKET" class="button tiny" />
          </div>
        </form>
      </fieldset>
    </div>
  </div>
</template>

<script>
/*
http://m.pipgame.com/en_qas/new?id=xxx&name=xxx&p_name=xxx&game_id=xxx

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
  props: ['id', 'name', 'p_name', 'game_id', 'acc_name', 'version', 'lang']
};
</script>

<style lang="scss">

</style>


