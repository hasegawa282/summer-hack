// -- basic library --

// -- http connection library --

// -- external components --
import BpDialog, { BpDialogProps } from 'components/atoms/BpDialog';
// import InputComponent from 'components/molecules/InputCompont';
// import InputBox from 'components/atoms/InputBox';
// import useString from 'hooks/useString/useString';
import { Footer } from 'components/atoms/StyledTag';
import RoundedButton from 'components/atoms/RoundedButton';
// import { Dataset, trainingDatasetPostAPI } from 'api/training-datasets';
import { Weaken } from 'utils/types';
// import { validateDatasetName } from 'utils/validates';
// import AlertDialog from 'components/organisms/AlertDialog';
import InputComponent from 'components/molecules/InputCompont';
import useReason from 'hooks/useReason/useReason';
import useBool from 'hooks/useBool/useBool';
import ToggleButton from 'components/molecules/ToggleButton';
import { validatePostAttendance } from 'utils/validates/validatePostAttendance';
import AlertDialog from './AlertDialog';
import { attendancesPostAPI } from 'api/attendances';
import ConfirmDialog from './ConfirmDialog';
import { converDateToAPI } from 'utils/operateDate';

// -- external datas --

// -- external functions --

// -- external types --
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface PostAttendanceDialogProps extends Weaken<BpDialogProps, 'onClose'> {
  onClose: (cancel?: boolean) => void;
  child_id: string;
}

/** 今日の出席を行うコンポーネント**/
const PostAttendanceDialog = (props: PostAttendanceDialogProps) => {
  const [reason, setReason] = useReason();
  const [attend, { onSwitch }] = useBool();

  // 完了した時の関数
  const onFinish = async () => {
    const today = new Date();
    // データセット名を元にデータセットを作成(裏側でtenant_idに紐づくカートテーブルから作成する)
    const res = await attendancesPostAPI({
      child_id: props.child_id,
      status: attend ? 0 : 1, // 出席時は0, 欠席時は1
      reason: !attend ? reason : null,
      date: converDateToAPI(today),
    });
    // 通信に成功したらダイアログを閉じる
    if (res.status === 201 || res.status === 200) {
      props.onClose(false);
    }
  };

  // 完了を確認するダイアログを表示する関数
  const conirmFinishClick = async () => {
    // バリデーション
    try {
      validatePostAttendance(attend, reason);
    } catch (e) {
      if (e instanceof Error) {
        AlertDialog.show(e.message);
      }
      return;
    }
    ConfirmDialog.show(
      <div>
        [確認]登録された内容で本日の出欠を行います。
        <br />
        よろしいですか？
      </div>,
      onFinish,
      undefined
    );
  };
  // -- render part --
  return (
    <BpDialog
      isOpen={props.isOpen}
      onClose={() => props.onClose(true)}
      title="本日の出欠登録"
      canOutsideClickClose={false}
    >
      <InputComponent title="出欠">
        <ToggleButton checked={attend} onClick={onSwitch} ok_text="出席" off_text="欠席" />
      </InputComponent>
      {!attend && (
        <InputComponent title="欠席理由">
          <textarea style={{ width: '100%' }} value={reason} onChange={(e) => setReason(e.currentTarget.value)} />
        </InputComponent>
      )}
      <Footer>
        <RoundedButton onClick={conirmFinishClick} text="登録" />
      </Footer>
    </BpDialog>
  );
};

// -- finally export part --

export default PostAttendanceDialog;
