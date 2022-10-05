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
        <IonImg src={CEHLogo} />

        <IonImg src={NERCLogo} />

        <IonImg src={JnccLogo} />

        <IonImg src={BRCLogo} />
      </div>
    </Main>
  </Page>
);

export default Partners;
