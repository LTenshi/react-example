import { BadRequestException, Injectable } from '@nestjs/common';
import { ExampleObjectDTO } from 'classes/ExampleObjectDTO';

@Injectable()
export class AppService {
  returnObject: ExampleObjectDTO[] = [
    {
      title: 'The Hunt for Red October',
      description:
        'Moscow, Washington D.C. and a CIA Analyst track a rouge Soviet Captain and his new submarine.',
      rating: 10,
      dateAdded: new Date(2025, 6, 20),
    },
    {
      title: 'The Enemy Below',
      description:
        'During WWII an American destroyer discovers a German U-boat, and in the ensuing duel the American captain must draw upon all his experience to defeat the equally experienced German commander.',
      rating: 8,
      dateAdded: new Date(2025, 6, 19),
    },
    {
      title: 'Greyhound',
      description:
        'Several months after the U.S. entry into World War II, an inexperienced U.S. Navy commander must lead an Allied convoy being stalked by a German submarine wolf pack.',
      rating: 9,
      dateAdded: new Date(2025, 6, 20),
    },
    {
      title: 'Crimson Tide',
      description:
        'On a U.S. nuclear missile sub, a young First Officer stages a mutiny to prevent his trigger-happy Captain from launching his missiles before confirming his orders to do so.',
      rating: 9,
      dateAdded: new Date(2025, 6, 18),
    },
    {
      title: 'Kursk',
      description:
        'An explosion on a nuclear-powered Russian submarine kills most of the men aboard and causes the few survivors to huddle in waterlogged and oxygen',
      rating: 7,
      dateAdded: new Date(2025, 6, 18),
    },
    {
      title: 'Hunter Killer',
      description:
        'An untested American submarine captain teams with U.S. Navy Seals to rescue the Russian president, who has been kidnapped by a rogue general.',
      rating: 5,
      dateAdded: new Date(2025, 6, 18),
    },
    {
      title: 'K-19: The Widowmaker',
      description:
        "When Russia's first nuclear submarine malfunctions on its maiden voyage, the crew must race to save the ship and prevent a nuclear disaster.",
      rating: 7,
      dateAdded: new Date(2025, 6, 20),
    },
    {
      title: 'Das Boot',
      description:
        'A German U-boat stalks the frigid waters of the North Atlantic as its young crew experience the sheer terror and claustrophobic life of a submariner in World War II.',
      rating: 10,
      dateAdded: new Date(2025, 6, 17),
    },
  ];

  getExampleText(): string {
    return 'This is an example get request output!';
  }

  getExampleArrayObject(): ExampleObjectDTO[] {
    return this.returnObject;
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

  postMovieExample(movieObject: ExampleObjectDTO) {
    if (Object.entries(movieObject).length !== 4) {
      throw new BadRequestException({
        movieObject,
        message: 'Invalid data provided!',
      });
    }
    this.returnObject.push(movieObject);
  }
}
