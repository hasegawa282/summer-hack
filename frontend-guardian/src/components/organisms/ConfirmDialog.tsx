import React from 'react';
import BpAlert from 'components/atoms/BpAlert';

interface ConfirmDialogProps {}
interface ConfirmDialogState {
  isOpen: boolean;
  message: string | JSX.Element | string[];
  callbackClose?: () => void;
  callbackCancel?: () => void;
  callbackConfirm?: () => void;
}
/**
 * 確認メッセージダイアログです。
 * シングルトンインスタンスを保持するため、画面上に２つ以上配置しないでください。
 * ダイアログの呼び出し方:
 *  ConfirmDialog.show('メッセージ');
 */
export default class ConfirmDialog extends React.PureComponent<ConfirmDialogProps, ConfirmDialogState> {
  static instance?: ConfirmDialog;
  constructor(props: ConfirmDialogProps) {
    super(props);
    this.state = {
      isOpen: false,
      message: '',
    };
  }
  componentDidMount() {
    ConfirmDialog.instance = this;
  }
  componentWillUnmount() {
    ConfirmDialog.instance = undefined;
  }
  static show(
    message: string | JSX.Element | string[],
    callbackConfirm?: () => void,
    callbackCancel?: () => void,
    callbackClose?: () => void
  ) {
    if (ConfirmDialog.instance) {
      ConfirmDialog.instance.setState({
        isOpen: true,
        message: message,
        callbackClose: callbackClose,
        callbackCancel: callbackCancel,
        callbackConfirm: callbackConfirm,
      });
    } else {
      alert(message);
    }
  }
  onClose() {
    this.setState({ isOpen: false });
    if (this.state.callbackClose) {
      this.state.callbackClose();
    }
  }
  onCancel() {
    this.onClose();
    if (this.state.callbackCancel) {
      this.state.callbackCancel();
    }
  }
  onConfirm() {
    this.onClose();
    if (this.state.callbackConfirm) {
      this.state.callbackConfirm();
    }
  }
  render() {
    return (
      <>
        {this.state.isOpen ? (
          <BpAlert
            confirmButtonText="OK"
            cancelButtonText="キャンセル"
            isOpen={this.state.isOpen}
            onCancel={() => this.onCancel()}
            onConfirm={() => this.onConfirm()}
            onClose={() => this.onClose()}
          >
            {this.state.message}
          </BpAlert>
        ) : null}
      </>
    );
  }
}
