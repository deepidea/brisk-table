---
layout: post
---
If you have too long colums, Brisk Table can concatenate it for you


```
<div class="brisk-table tableConfig"
     data-json-path="$..teachers"
     data-custom-fields='[
         {"fieldName":"firstName","columnName":"First Name","columnWidth":10},
         {"fieldName":"lastName","columnName":"Last Name","columnWidth":60},
         {"fieldName":"age","columnName":"Age","columnWidth":10},
         {"fieldName":"cellPhone","columnName":"Cell Phone","columnWidth":330}
     ]'
 ```
 ```
     data-column-text-length="30"
 ```
 ```
     data-provider-function="dataProviderFunction"
></div>
```

Note: filter will be applied only to concatenated part in UI
