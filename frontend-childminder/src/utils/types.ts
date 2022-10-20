/** 自由なkey(string or number)に対して、value: anyを持つオブジェクト型**/
export interface IObject<T> {
  [key: string | number]: T;
}
/** interfaceをextendsする際に、プロパティを上がいて型を指定する際に利用**/
export type Weaken<T, K extends keyof T> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [P in keyof T]: P extends K ? any : T[P];
};
