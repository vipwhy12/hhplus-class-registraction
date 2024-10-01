import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ParseDatePipe implements PipeTransform<string, Date> {
  transform(value: string): Date {
    this.validateDateFormat(value);
    this.validateDateValue(value);

    return this.parseToDate(value);
  }

  // YYYY-MM-DD 형식의 문자열을 Date 객체로 변환
  private parseToDate(value: string): Date {
    const [year, month, day] = value.split('-').map(Number);
    return new Date(year, month - 1, day);
  }

  // 날짜 형식 검증 (YYYY-MM-DD)
  private validateDateFormat(dateString: string): void {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

    if (!dateRegex.test(dateString)) {
      throw new BadRequestException(
        'Invalid date format. Expected YYYY-MM-DD.',
      );
    }
  }

  // 날짜 값 검증 (월, 일 범위)
  private validateDateValue(dateString: string): void {
    const [year, month, day] = dateString.split('-').map(Number);

    this.validateMonthRange(month);
    this.validateDayRange(year, month, day);
  }

  // 월 범위 검증
  private validateMonthRange(month: number): void {
    if (month < 1 || month > 12) {
      throw new BadRequestException(
        'Invalid month. Expected value between 1 and 12.',
      );
    }
  }

  // 일 범위 검증
  private validateDayRange(year: number, month: number, day: number): void {
    const daysInMonth = this.getDaysInMonth(year, month);
    if (day < 1 || day > daysInMonth) {
      throw new BadRequestException(
        `Invalid day for the month. Expected value between 1 and ${daysInMonth}.`,
      );
    }
  }

  // 월에 따른 일 수 반환
  private getDaysInMonth(year: number, month: number): number {
    const daysInMonths = [
      31, // 1월
      this.isLeapYear(year) ? 29 : 28, // 2월
      31,
      30,
      31,
      30,
      31,
      31,
      30,
      31,
      30,
      31, // 3월 ~ 12월
    ];
    return daysInMonths[month - 1];
  }

  // 윤년 계산
  private isLeapYear(year: number): boolean {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  }
}
