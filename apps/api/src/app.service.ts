import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getExampleText(): string {
    return 'This is an example get request output!'
  }

  postExampleText(text: string): string {
    const randomNumber = Math.floor(Math.random() * 5);
    const adjectives = ["Beautiful", "Charming", "Despicable", "Angry", "Mellow"]
    return `This is an example post return: ${adjectives[randomNumber]}-${text}`
  }
}
