const DemoApp = angular.module('DemoApp', ['dx']);
let maxID = employees[employees.length - 1].ID;

DemoApp.controller('DemoController', ($scope) => {
  const isChief = function (position) {
    return position && ['CEO', 'CMO'].indexOf(position.trim().toUpperCase()) >= 0;
  };

  $scope.dataGridOptions = {
    dataSource: employees,
    showBorders: true,
    keyExpr: 'ID',
    paging: {
      enabled: false,
    },
    editing: {
      mode: 'row',
      allowUpdating: true,
      allowDeleting(e) {
        return !isChief(e.row.data.Position);
      },
      useIcons: true,
    },
    onRowValidating(e) {
      const position = e.newData.Position;

      if (isChief(position)) {
        e.errorText = `The company can have only one ${position.toUpperCase()}. Please choose another position.`;
        e.isValid = false;
      }
    },
    onEditorPreparing(e) {
      if (e.parentType === 'dataRow' && e.dataField === 'Position') {
        e.editorOptions.readOnly = isChief(e.value);
      }
    },
    columns: [
      {
        type: 'buttons',
        width: 110,
        buttons: ['edit', 'delete', {
          hint: 'Clone',
          icon: 'copy',
          visible(e) {
            return !e.row.isEditing;
          },
          disabled(e) {
            return isChief(e.row.data.Position);
          },
          onClick(e) {
            const clonedItem = angular.copy(e.row.data);
            maxID += 1;
            clonedItem.ID = maxID;
            employees.splice(e.row.rowIndex, 0, clonedItem);
            e.component.refresh(true);
            e.event.preventDefault();
          },
        }],
      },
      {
        dataField: 'Prefix',
        caption: 'Title',
      },
      'FirstName',
      'LastName',
      {
        dataField: 'Position',
        width: 130,
      }, {
        dataField: 'StateID',
        caption: 'State',
        width: 125,
        lookup: {
          dataSource: states,
          displayExpr: 'Name',
          valueExpr: 'ID',
        },
      }, {
        dataField: 'BirthDate',
        dataType: 'date',
        width: 125,
      },
    ],
  };
});
