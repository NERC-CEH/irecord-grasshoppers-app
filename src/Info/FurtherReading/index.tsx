import { Page, Main, Header, Section } from '@flumens';
import { IonImg } from '@ionic/react';
import marshallhaesImage from './images/marshallhaes.jpg';
import newnaturalistImage from './images/newnaturalist.jpg';
import photographicguideImage from './images/photographicguide.jpg';
import raggeImage from './images/ragge.jpg';
import haeshardingImage from './images/haesharding.jpg';
import './styles.scss';

const { P } = Section;

const FurtherReading = () => (
  <Page id="furtherReading">
    <Header title="Further Reading" />
    <Main>
      <Section>
        <P>
          <IonImg src={newnaturalistImage} />
          Ted Benton's{' '}
          <a href="http://www.newnaturalists.com/product/9780007277247/Grasshoppers+and+Crickets+">
            New Naturalist Grasshoppers & Crickets
          </a>{' '}
          is an outstanding, comprehensive, new book covering each species in
          detail (identification, life cycle, habitat, behaviour, ecology,
          distribution and conservation). In addition, there are in-depth
          general chapters on topics such as anatomy & physiology, life cycles,
          courtship & reproduction, and sexual selection. The book contains a
          DVD with fascinating video clips showing song, egg laying and other
          bevaviour of many species.
        </P>

        <P>
          <IonImg src={photographicguideImage} />
          An excellent identification tool is the{' '}
          <a href="http://www.wildguideuk.com/wguk_books/grasshopper_book/grasshopper_book.html">
            Photographic Guide to the Grasshoppers & Crickets of Britain &
            Ireland
          </a>{' '}
          by Martin Evans and Roger Edmondson, which comprehensively illustrates
          the characteristics of males and females, adults and young and the
          different colour forms of each species, and contains a very useful
          photographic key.
        </P>

        <P>
          <IonImg src={marshallhaesImage} />
          The 1988{' '}
          <strong>
            Grasshoppers and Allied Insects of Great Britain and Ireland
          </strong>{' '}
          by Judith Marshall and Chris Haes was the first full atlas of these
          species, providing 10-km maps illustrating current and historic
          distributions, and also containing comprehensive species accounts and
          general chapters. It is the best identification guide to the "allies"
          - cockroaches, earwigs and stick insects.
        </P>

        <P>
          <IonImg src={haeshardingImage} />
          The 1997{' '}
          <strong>
            Atlas of grasshoppers, crickets and allied insects in Britain and
            Ireland
          </strong>{' '}
          by Chris Haes and Paul Harding is the second national atlas, providing
          updated 10-km distribution maps. It can be downloaded here:{' '}
          <a href="http://nora.nerc.ac.uk/7358/1/Grasshoppers.pdf">Nora</a>.
          Work on a third distribution atlas is ongoing, and records received
          through this app are a most welcome contribution!
        </P>

        <P>
          <IonImg src={raggeImage} />
          David Ragge's 1965{' '}
          <strong>
            Grasshoppers, Crickets and Cockroaches of the British Isles
          </strong>{' '}
          has inspired many of today's "Orthopterists" and is occasionally
          available second-hand. It provides detailed species accounts and
          general chapters, county-level distribution maps, and the basis for
          the song diagrams used in this app.
        </P>

        <P>
          There are a range of excellent county-level atlases and publications.
          You can find a list of them here:{' '}
          <a href="http://www.orthoptera.org.uk/recording/node/364">
            Orthoptera
          </a>
          .
        </P>
      </Section>
    </Main>
  </Page>
);

export default FurtherReading;
