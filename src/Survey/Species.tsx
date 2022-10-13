import { FC, useContext } from 'react';
import { observer } from 'mobx-react';
import Sample from 'models/sample';
import { Species } from 'common/data/species';
import { Page, Header } from '@flumens';
import { NavContext } from '@ionic/react';
import Main from 'common/Components/SpeciesList';

type Props = {
  sample: Sample;
};
const SpeciesSelect: FC<Props> = ({ sample }) => {
  const { goBack } = useContext(NavContext);

  function onSelect(sp: Species) {
    sample.occurrences[0].attrs.taxon = sp; // eslint-disable-line
    sample.save();

    goBack();
  }

  return (
    <Page id="species-attr">
      <Header title="Species" />
      <Main onSpeciesClick={onSelect} />
    </Page>
  );
};

export default observer(SpeciesSelect);
