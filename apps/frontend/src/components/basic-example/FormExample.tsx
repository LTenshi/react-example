import nestServerModule from '@/modules/nestServerModule';
import { FormEvent, useMemo } from 'react';
import UiBox from '@/components/generic/UiBox';
import InputWrapper from '@/components/generic/InputWrapper';
import { ExampleObjectDTO } from '@/classes/ExampleObjectDTO';
import {
  MultiRenderingContext,
  useMultiRenderingContext,
} from '@/contexts/MultiRenderingContext';

export default function FormExample() {
  const { setExampleList, setIsMultiLoading } =
    useMultiRenderingContext() as MultiRenderingContext;
  const nestServer = useMemo(() => new nestServerModule(), []);

  async function handleFormSubmit(e: FormEvent) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form as HTMLFormElement);

    const formJson = Object.fromEntries(formData.entries()) as unknown as {
      title: string;
      description: string;
      rating: number;
      dateAdded: Date;
    };
    const parsedFormJson = new ExampleObjectDTO(
      formJson.title,
      formJson.description,
      Number(formJson.rating),
      new Date(formJson.dateAdded),
    );

    const responseBool = await nestServer.postMovie(parsedFormJson);
    if (responseBool) {
      setIsMultiLoading(true);
      setExampleList(await nestServer.getArrayObjectExample());
      setIsMultiLoading(false);
    }
  }

  return (
    <UiBox className="mt-2">
      <div className="p-2">
        <h3>Form Submitting Example</h3>
        <div>Here&apos;s a form to submit your own movie to the list above</div>
        <h6>
          The data will be sent to the API POST{' '}
          <a>/example/post-movie-object</a> endpoint, if successful the
          component above will receive a new list!
        </h6>
        <form method="post" onSubmit={handleFormSubmit}>
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
            <InputWrapper inputTitle="Movie Name">
              <input
                data-testid="input-form-title"
                className="w-full"
                name="title"
                type="text"
                placeholder="Lord of the Ri..."
                required
              ></input>
            </InputWrapper>
            <InputWrapper inputTitle="Description">
              <textarea
                data-testid="textarea-form-description"
                className="w-full"
                name="description"
                rows={5}
                placeholder="A movie about a fellowship of..."
                required
              ></textarea>
            </InputWrapper>
            <InputWrapper inputTitle="Rating (out of 10)">
              <input
                data-testid="input-form-rating"
                className="w-full"
                name="rating"
                type="number"
                min="0"
                max="10"
                required
              ></input>
            </InputWrapper>
            <InputWrapper inputTitle="Date added">
              <input
                data-testid="input-form-date-added"
                className="w-full"
                name="dateAdded"
                type="date"
              ></input>
            </InputWrapper>
          </div>
          <button
            data-testid="submit-form-example"
            type="submit"
            className="mt-2 font-bold py-2 px-4 rounded"
          >
            Submit form
          </button>
        </form>
      </div>
    </UiBox>
  );
}
