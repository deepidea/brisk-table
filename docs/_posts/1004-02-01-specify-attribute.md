---
layout: post
---
You can specify next attribute to define your custom function which will receive json object of selected row

```
<script type="text/javascript">
    function hookFunction(rowData){
        alert('\'on row selected\' hook result:' + JSON.stringify(rowData, null, 4));
    }
</script>
```

```
<div class="brisk-table tableConfig"
     data-json-path="$..teachers"
     data-custom-fields='[
         {"fieldName":"firstName","columnName":"First Name","columnWidth":10},
         {"fieldName":"lastName","columnName":"Last Name","columnWidth":60},
         {"fieldName":"age","columnName":"Age","columnWidth":10},
         {"fieldName":"cellPhone","columnName":"Cell Phone","columnWidth":330}
     ]'
     data-column-text-length="30"
 ```
 ```
     data-hook-on-row-selected="hookFunction"
 ```
 ```
     data-provider-function="dataProviderFunction"
></div>
```
