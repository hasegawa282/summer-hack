// -- redux library --

// import axios from 'axios';
import AlertDialog from 'components/organisms/AlertDialog';

// -- ready handler --
const onReady = (request: any) => {
  return request;
};

// -- success handler --
const onSuccess = (response: any) => {
  return response;
};

// -- error handler --
const onError = (err: any, disabled_error_message?: boolean) => {
  if (!err) {
    return;
  }
  if (disabled_error_message) {
    // エラーメッセージをスキップする
    return err.response;
  }
  console.log(err);
  switch (err.response.status) {
    case 400: // 入力データに誤りがある場合
      AlertDialog.show('入力データに誤りがあります。');
      break;

    case 401: // ユーザーが認証されていない場合
      // return accountsRefreshPostAPI({refresh_token: String(sessionStorage.getItem('refresh_token'))}).then((res) => {
      //   store.dispatch(authActions.refreshToken(res.data.authentication_result.access_token));

      //   // 再度リクエスト
      //   const config = err.config;
      //   if (typeof config.data === 'string') {
      //     config.data = JSON.parse(config.data)
      //   }
      //   config.headers['x-api-key'] = res.data.authentication_result.access_token;

      //   return axios.request(config);
      // }).catch(() => {
      //   AlertDialog.show('ユーザーが認証されませんでした。再度ログインをしてください。');
      //   store.dispatch(authActions.signOut());
      //   return err.response;
      // });
      AlertDialog.show('認証情報を更新してください');
      break;

    case 404: // 指定したリソースがサーバーに存在しない場合
      AlertDialog.show('指定したリソースはサーバーに存在しません。');
      break;

    case 500: // サーバー内でエラーが発生した場合
      AlertDialog.show('サーバー内で予期せぬエラーが発生しました。');
      break;

    case 502: // サーバーとの通信でエラーが発生した場合
      AlertDialog.show('通信エラーが発生しました。');
      break;

    case 503: // サーバーがアクセス過多で一時的に利用できない時
      AlertDialog.show('アクセス過多によりサービスが一時的に利用できません。数分待ってから再度実行してください。');
      break;

    case 504: // サーバーとの通信がタイムアウトした時
      AlertDialog.show('通信がタイムアウトしました。');
      break;

    default:
      // 予期していないエラー
      AlertDialog.show('予期せぬエラーが発生しました。');
      break;
  }
  return err.response;
};

// -- export part --
export { onReady, onSuccess, onError };
