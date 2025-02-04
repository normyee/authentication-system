export function validateEmail(email: string) {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
}

export function validateString(value: any): boolean {
  return typeof value === 'string';
}

export function validateName(name: string): boolean {
  return typeof name === 'string' && name.trim().length >= 2;
}

export function validatePassword(password: string): boolean {
    const minLength = 6;
    const regex = /^(?=.*[0-9])/;  
  
  
    return password.length >= minLength && regex.test(password);
  }