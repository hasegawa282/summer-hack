/** ReplyをPost送信する際のバリデーション関数**/
export interface ValidateReplyProps {
  reply?: string | null;
  reply_teacher_id?: string | null;
  reply_teacher_name?: string | null;
}
export const validateReply = (props: ValidateReplyProps): Error | void => {
  // 先生を記載していない場合はエラー
  if (!props.reply_teacher_id || !props.reply_teacher_name) throw new Error(`先生を選択してください`);
  // 返信内容を記載していない場合はエラー
  if (!props.reply) throw new Error(`返信内容を記入してください`);
};
