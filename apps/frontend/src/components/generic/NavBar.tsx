import Link from 'next/link';
import UiBox from '@/components/generic/UiBox';

export default function NavBar() {
  return (
    <UiBox>
      <div className="p-2 mt-2 text-xl font-medium text-black dark:text-white flex gap-5">
        <Link href="/">
          <h5>Home</h5>
        </Link>
        <Link href="/examples">
          <h5>Examples</h5>
        </Link>
        <Link href="/advanced">
          <h5>Advanced Example</h5>
        </Link>
      </div>
    </UiBox>
  );
}
