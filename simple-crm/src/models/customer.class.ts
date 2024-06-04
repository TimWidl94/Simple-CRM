export class Customer {
  id: string;
  customerNumber: number;
  firstName: string;
  lastName: string;
  country: string;
  email: string;
  telefonNumber: number;
  street: string;
  zipCode: number;
  city: string;

  constructor(obj?: any) {
    this.id = obj ? obj.id : '';
    this.customerNumber = obj ? obj.customerNumber : '';
    this.firstName = obj ? obj.firstName : '';
    this.lastName = obj ? obj.lastName : '';
    this.email = obj ? obj.email : '';
    this.telefonNumber = obj ? obj.telefonNumber : '';
    this.country = obj ? obj.country: '';
    this.street = obj ? obj.street : '';
    this.zipCode = obj ? obj.zipCode : '';
    this.city = obj ? obj.city : '';
  }
}
