export const command: string = 'get <key>';
export const desc: string = 'Manage c2li variables';

interface GetArgs {
  key: string;
}

export const handler = (
  {
    key,
  }: GetArgs
) => {
  
};