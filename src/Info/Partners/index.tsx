import { Page, Main, Header, Section } from '@flumens';
import { IonImg } from '@ionic/react';
import CEHLogo from './images/ceh_logo.png';
import BRCLogo from './images/BRC_approved_logo.png';
import NERCLogo from './images/logoNerc.png';
import JnccLogo from './images/logoJncc.png';
import './styles.scss';

const { P } = Section;

const Partners = () => (
  <Page id="partners">
    <Header title="Partners" />
    <Main>
      <Section>
        <P>
          This app has been produced by the Grasshoppers and Related Insects
          Recording Scheme.
        </P>
        <P>
          The production of this app was supported by the following
          organisations:
        </P>
      </Section>
      <div className="logos">
        <a href="https://www.ceh.ac.uk/">
          <IonImg src={CEHLogo} />
        </a>

        <a href="https://www.ukri.org/">
          <IonImg src={NERCLogo} />
        </a>

        <a href="https://www.jncc.gov.uk/">
          <IonImg src={JnccLogo} />
        </a>

        <a href="https://www.brc.ac.uk/">
          <IonImg src={BRCLogo} />
        </a>
      </div>
    </Main>
  </Page>
);

export default Partners;
