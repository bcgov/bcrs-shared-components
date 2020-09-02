import DetailComment from './DetailComment.vue'

export default {
  title: 'component/DetailComment',
  component: DetailComment,
};

export const Default = () => ({
  components: { DetailComment },
  template: '<detail-comment />',
});
