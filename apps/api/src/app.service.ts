import { Injectable } from '@nestjs/common';
import { ExampleObjectDTO } from 'classes/ExampleObjectArrayDTO';

@Injectable()
export class AppService {
  getExampleText(): string {
    return 'This is an example get request output!';
  }

  getExampleArrayObject(): ExampleObjectDTO[] {
    const returnObject: ExampleObjectDTO[] = [
      {
        title: 'The Hunt for Red October',
        description:
          'Moscow, Washington D.C. and a CIA Analyst track a rouge Soviet Captain and his new submarine.',
      },
      {
        title: 'The Enemy Below',
        description:
          'During WWII an American destroyer discovers a German U-boat, and in the ensuing duel the American captain must draw upon all his experience to defeat the equally experienced German commander.',
      },
      {
        title: 'Greyhound',
        description:
          'Several months after the U.S. entry into World War II, an inexperienced U.S. Navy commander must lead an Allied convoy being stalked by a German submarine wolf pack.',
      },
      {
        title: 'Crimson Tide',
        description:
          'On a U.S. nuclear missile sub, a young First Officer stages a mutiny to prevent his trigger-happy Captain from launching his missiles before confirming his orders to do so.',
      },
      {
        title: 'Kursk',
        description:
          'An explosion on a nuclear-powered Russian submarine kills most of the men aboard and causes the few survivors to huddle in waterlogged and oxygen',
      },
      {
        title: 'Hunter Killer',
        description:
          'An untested American submarine captain teams with U.S. Navy Seals to rescue the Russian president, who has been kidnapped by a rogue general.',
      },
      {
        title: 'K-19: The Widowmaker',
        description:
          "When Russia's first nuclear submarine malfunctions on its maiden voyage, the crew must race to save the ship and prevent a nuclear disaster.",
      },
      {
        title: 'Das Boot',
        description:
          'A German U-boat stalks the frigid waters of the North Atlantic as its young crew experience the sheer terror and claustrophobic life of a submariner in World War II.',
      },
    ];
    return returnObject;
  }

  postExampleText(text: string): string {
    if (!text) {
      return `API didn't get any text :(`;
    }
    const randomNumber = Math.floor(Math.random() * 5);
    const adjectives = [
      'Beautiful',
      'Charming',
      'Despicable',
      'Angry',
      'Mellow',
    ];
    return `This is an example post return: ${adjectives[randomNumber]}-${text}`;
  }
}
