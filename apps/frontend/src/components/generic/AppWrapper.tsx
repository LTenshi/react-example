// The AppWrapper should ideally be stateless, so that I can use it in layout.tsx and not re-render this every time a page changes

import { NavBar, TitleBar } from '.';

// I'm leaving this here to say that I am aware of it.
export default function AppWrapper(props: {
  children: React.ReactElement | React.ReactElement[] | string;
}) {
  return (
    <div className="h-screen">
      <main className="h-23/24 overflow-auto">
        <div className="p-2">
          <TitleBar />
          <NavBar />
          {props.children}
        </div>
      </main>
      <footer className="text-right pr-2 h-1/24">
        Made by{' '}
        <a target="_blank" href="https://github.com/LTenshi/react-example">
          Lukasz Pawlak
        </a>
      </footer>
    </div>
  );
}
