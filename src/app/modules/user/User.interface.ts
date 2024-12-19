export type TName = {
    firstName: string;
    middleName: string;
    lastName: string;
  };


export type TUser= {
    _id: string;
    name: TName;
    gender: 'male' | 'female' | 'other';
    email: string;
    isBlocked: boolean;
    password: string;
    needsPasswordChange: boolean;
    role: 'admin' | 'user' ;
    isDeleted: boolean;
   
  };