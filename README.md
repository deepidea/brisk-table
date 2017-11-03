# Brisk Table
is universal and easy to use JavaScript library that displays any data in a table format.

See demo with examples here  https://deepidea.github.io/brisk-table/


# Brisk Table examples

**Example 1** is a little, simple and brisk!

```html
<!doctype html>
<html>
<head>
    <title>Brisk Table</title>
</head>

<body>
    <h3>This is a little, simple and brisk example!</h3>
    <p></p>
    <div class="brisk-table"
         data-url="https://raw.githubusercontent.com/deepidea/brisk-table/master/json-server-db/db.json"
         data-json-path="$..simpledata"
    ></div>
    <script src="https://rawgit.com/deepidea/brisk-table/master/brisk-table.js"></script>
</body>
</html>
```
[`Demo`](https://deepidea.github.io/brisk-table/examples/get-data-from-remote-server.html)

**Example 2** we are using next features:
* css for configure table
* ajax in ajaxDataProviderFunction for get data from remote server
* custom json path to return array in json object
* checkboxes to select multiple rows
* show selected rows
* show custom fields
* trim long text

```html
<!doctype html>
<html>
<head>
    <title>Brisk Table</title>
    <style type="text/css">
        .tableConfig {
            --header-toolbar-height: 35;
            --header-column-height: 30;
            --row-height: 26;
            --rows-per-page: 5;
            --rows-size-list: 5, 10;
        }
    </style>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
</head>

<body>
    <script type="text/javascript">
        function ajaxDataProviderFunction(){
            return $.ajax({
                dataType: 'json',
                url: 'https://raw.githubusercontent.com/deepidea/brisk-table/master/json-server-db/db.json',
                success: function(jsonData){
                    return jsonData;
                }
            });
        }
    </script>

    <script type="text/javascript">
        function fetchSelectedRows(id){
            let selectedRows = briskTableFunctions.fetchSelectedRows(id);

            alert('\'on button "Click to fetch selected rows" click\' hook result:' + JSON.stringify(selectedRows, null, 4));
        }
    </script>

    <h3>This is extended example!</h3>
    
    <button onclick="fetchSelectedRows('1')">Click to fetch selected rows</button>
    <div class="brisk-table tableConfig"
         id="1"
         data-provider-function="ajaxDataProviderFunction"
         data-json-path="$..teachers"
         data-custom-fields='[
            {"fieldName":"firstName","columnName":"First Name","columnWidth":15},
            {"fieldName":"lastName","columnName":"Last Name","columnWidth":20},
            {"fieldName":"age","columnName":"Age","columnWidth":10},
            {"fieldName":"cellPhone","columnName":"Cell Phone","columnWidth":60},
            {"fieldName":"notes","columnName":"Notes","columnWidth":200}
         ]'
         data-column-text-length="100"
         data-show-checkboxes="true"
    ></div>
    <script src="https://rawgit.com/deepidea/brisk-table/master/brisk-table.js"></script>
</body>
</html>
```
[`Demo`](https://deepidea.github.io/brisk-table/examples/provider-custom_fields-chckboxes-fetch_selected.html)

**Example 3** local data fetch provider:

```html
<!doctype html>
<html>
<head>
    <title>Brisk Table</title>
</head>

<body>
    <script type="text/javascript">
    function dataProviderFunction() {
        var data = [
                {
                    "firstName": "John",
                    "lastName": "Smith",
                    "age": 30,
                    "cellPhone": "+000123456789",
                    "notes": "JavaScript is programming language."
                },
                {
                    "firstName": "Medie",
                    "lastName": "Lorn",
                    "age": 50,
                    "cellPhone": "+000987654321",
                    "notes": "JavaScript is programming language."
                },
                {
                    "firstName": "Olsom",
                    "lastName": "Clarke",
                    "age": 42,
                    "cellPhone": "+005678901234",
                    "notes": "JavaScript is programming language."
                }
            ];

        return data;
    }

</script>

    <h3>Local data fetch provider</h3>

    <div class="brisk-table"
         data-provider-function="dataProviderFunction"
         data-json-path="$"
    ></div>

    <script src="https://rawgit.com/deepidea/brisk-table/master/brisk-table.js"></script>
</body>
</html>
```
[`Demo`](https://deepidea.github.io/brisk-table/examples/local_provider-jsonpath_root-custom_fields.html)