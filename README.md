# Brisk Table
is universal and easy to use JavaScript library that displays any data in a table format.

Especially good for fast prototyping.

See demo with examples here  https://deepidea.github.io/brisk-table/

<br><br>
# Brisk Table examples

**Example 1** Look how easy to start using it
```html
<!doctype html>
<html>
<head>
    <title>Brisk Table</title>
</head>

<body>
    <h3>It is simple and brisk</h3>
    <p></p>
    <div class="brisk-table"
         data-url="https://raw.githubusercontent.com/deepidea/brisk-table/master/json-server-db/db.json"
         data-json-path="$..simpledata"
    ></div>
    <script src="https://cdn.jsdelivr.net/gh/deepidea/brisk-table@master/brisk-table.js"></script>
</body>
</html>
```
[`Demo`](https://deepidea.github.io/brisk-table/examples/get-data-from-remote-server.html)

<br><br>
**Example 2** create table from local JavaScript json data:

https://github.com/deepidea/brisk-table/blob/master/docs/examples/local_provider-jsonpath_root-custom_fields.html

[`Demo`](https://deepidea.github.io/brisk-table/examples/local_provider-jsonpath_root-custom_fields.html)

<br><br>
**Example 3** contains next features:
* using css to customise table
* using Ajax call in ajaxDataProviderFunction to get data from remote server
* custom json path 
* checkboxes to select multiple rows
* display selected rows
* show only custom fields
* trim long text

https://github.com/deepidea/brisk-table/blob/master/docs/examples/provider-custom_fields-chckboxes-fetch_selected.html

[`Demo`](https://deepidea.github.io/brisk-table/examples/provider-custom_fields-chckboxes-fetch_selected.html)

<br><br>
**Example 4** Real application with:
* hook funtion example
* refresh example
* displaying custom columns
* trimming long stings in table
* add/update/delete objects in local dataset

https://github.com/deepidea/brisk-table/blob/master/docs/examples/real-application.html

[`Demo`](https://deepidea.github.io/brisk-table/examples/real-application.html)
