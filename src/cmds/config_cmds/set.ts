export const command: string = 'set <key> <value>';
export const desc: string = 'Manage c2li variables';

interface SetArgs {
  key: string;
  value: string;
}

export const handler = (
  {
    key,
    value,
  }: SetArgs,
) => {
  
};