// Status will always be Active or Done
// Firebase response with object, can't be array
export type ActivityResponse = {
  [key: string]: {
    action: string;
    status: string;
  };
};

export type ActivityList = {
  _id: string;
  action: string;
  status: string;
};

export type CreateActionBody = {
  action: string;
  status: 'Active' | 'Done';
};
