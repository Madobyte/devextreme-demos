<template>
  <div>
    <DxTreeView
      id="simple-treeview"
      :create-children="createChildren"
      :root-value="''"
      :height="500"
      :expand-nodes-recursive="false"
      data-structure="plain"
    />
  </div>
</template>
<script>

import DxTreeView from 'devextreme-vue/tree-view';
import 'whatwg-fetch';

export default {
  components: {
    DxTreeView,
  },
  methods: {
    createChildren(parent) {
      const parentId = parent ? parent.itemData.id : '';

      return fetch(`https://js.devexpress.com/Demos/Mvc/api/TreeViewData?parentId=${parentId}`)
        .then((response) => response.json())
        .catch(() => { throw new Error('Data Loading Error'); });
    },
  },
};
</script>
