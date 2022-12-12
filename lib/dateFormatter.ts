export function formatted_date(date: number) {
    let result = "";
    let d = new Date(date);
    result += d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
  
    return result;
  }
  