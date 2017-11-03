# Brisk Table
is universal and easy to use JavaScript library that displays any data in a table format.

See demo with examples here  https://deepidea.github.io/brisk-table/

<br><br>
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

<br><br>
**Example 2** local data fetch provider:

https://github.com/deepidea/brisk-table/blob/master/docs/examples/local_provider-jsonpath_root-custom_fields.html

[`Demo`](https://deepidea.github.io/brisk-table/examples/local_provider-jsonpath_root-custom_fields.html)

<br><br>
**Example 3** we are using next features:
* css for configure table
* ajax in ajaxDataProviderFunction for get data from remote server
* custom json path to return array in json object
* checkboxes to select multiple rows
* show selected rows
* show custom fields
* trim long text

https://github.com/deepidea/brisk-table/blob/master/docs/examples/provider-custom_fields-chckboxes-fetch_selected.html

[`Demo`](https://deepidea.github.io/brisk-table/examples/provider-custom_fields-chckboxes-fetch_selected.html)

<br><br>
**Example 4** Enjoy! Real application with:
* add new teacher to table
* update data of any teacher
* delete record if your teacher gone

https://github.com/deepidea/brisk-table/blob/master/docs/examples/real-application.html

[`Demo`](https://deepidea.github.io/brisk-table/examples/real-application.html)