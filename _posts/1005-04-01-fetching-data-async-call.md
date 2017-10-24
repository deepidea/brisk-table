---
layout: post
---
Example of custom function. 

You can use any library or any HTTP method to ferch data from remote server

```
<script type="text/javascript">
    function ajaxDataProviderFunction(){
        return $.ajax({
            dataType: 'json',
            url: 'https://raw.githubusercontent.com/kupolua/web-presentation/master/json/db.json',
            success: function(jsonData){
                return jsonData;
            }
        });
    }
</script>
```
```
<div class="json-table tableConfig"
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
     data-provider-function="ajaxDataProviderFunction"
 ```
 ```
     data-hook-on-row-selected="hookFunction"
></div>
```

*Please pay attention that we're returning asynchronous method which returns data when making async call
