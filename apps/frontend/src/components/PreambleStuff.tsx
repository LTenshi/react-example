import UiBox from "./UiBox";

export function PreambleStuff() {
  return (
    <>
      <UiBox className="p-2 mt-2">
        <div>
          <h3>
            Readme
          </h3>
          <div>
            Hi! Thanks for browsing my github, and this react example specifically.<br/>
            I hope the setup wasn&apos;t too hard, I do in fact realise that changing this from bun to npm/pnpm/yarn is not as seamless as I&apos;d like it to be.
            <br/>
            <br/>
            Here&apos;s some basic information about this page:
            <ul className="list-disc list-inside">
              <li>It is meant to be responsive, if you change you screen size the page will accomodate it. This also means it works seamlessly with mobile</li>
              <li>Any link on this page appears in glorious <a>goldenrod</a></li>
              <li>Every section has a header and every subitem has prupose explained in the following style: <h6>There will be some information and maybe even an endpoint <a target="_blank" href="https://en.wikipedia.org/wiki/Solidago">/this/is/a/fake/endpoint</a> some GET endpoints might even be clickable</h6></li>
            </ul>
          </div>
        </div>
      </UiBox>
    </>
  )
}