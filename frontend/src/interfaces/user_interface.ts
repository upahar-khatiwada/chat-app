export default interface User {
  _id: string;
  fullName: string;
  email: string;
  avatar: string;
  googleId?: string;
}