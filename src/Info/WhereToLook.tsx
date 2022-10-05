import { Page, Main, Header, Section } from '@flumens';

const { P } = Section;

const WhereToLook = () => (
  <Page id="whereToLook">
    <Header title="Where To Look" />
    <Main>
      <Section>
        <P>
          For each species there is a distribution map showing where it's been
          found in recent years. Each species also has an{' '}
          <strong>ID Guide</strong> which contains a <strong>Habitat</strong>{' '}
          section to give you some specific guidance about where you are most
          likely to find it.
        </P>
        <P>
          The app also features general information about each species and
          contains a photo gallery and audio files, where relevant, to help you
          with identification.
        </P>
        <P>Happy hunting!</P>
      </Section>
    </Main>
  </Page>
);

export default WhereToLook;
