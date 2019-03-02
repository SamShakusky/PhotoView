<template>
  <div class="grid-adapter">
    <GridContainer>
      <GridItem>
        1
      </GridItem>
      <GridItem>
        2
      </GridItem>
    </GridContainer>
  </div>
</template>

<script>
import GridContainer from './GridContainer';
import GridItem from './GridItem';

export default {
  name: 'GridAdapter',
  components: {
    GridContainer,
    GridItem,
  },
};
</script>
