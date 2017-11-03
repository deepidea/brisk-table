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

**Example 4** Enjoy! Real application with:
* add new teacher to table
* update data of any teacher
* delete record if your teacher gone

```html
<!doctype html>
<html>
    <head>
        <title>Brisk Table</title>

        <!-- Latest compiled and minified CSS -->
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">

        <!-- Optional theme -->
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossorigin="anonymous">

        <!-- Main theme  -->
        <link rel="stylesheet" href="css/main.css">

        <!-- Jquery  -->
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>

        <!-- Latest compiled and minified JavaScript -->
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>

        <!-- alert.js is a jQuery notification plugin which allows you to display one or multiple alert messages via Bootstrap alerts components.  -->
        <script src="js/alert.js"></script>

        <!-- Custom functions. -->
        <script src="js/custom.js"></script>
    </head>

    <body>
        <h3>Teachers</h3>

        <div class="brisk-table tableConfig"
             id="1"
             data-provider-function="dataProviderFunction"
             data-json-path="$..teachers"
             data-custom-fields='[
                    {"fieldName":"id","columnName":"ID","columnWidth":5},
                    {"fieldName":"firstName","columnName":"First Name","columnWidth":15},
                    {"fieldName":"lastName","columnName":"Last Name","columnWidth":20},
                    {"fieldName":"age","columnName":"Age","columnWidth":10},
                    {"fieldName":"birthday","columnName":"Birthday","columnWidth":40},
                    {"fieldName":"cellPhone","columnName":"Cell Phone","columnWidth":50},
                    {"fieldName":"notes","columnName":"Note","columnWidth":100}
                 ]'
             data-hook-on-row-selected="hookFunction"
             data-column-text-length="50"
             data-show-checkboxes="false"
        ></div>

        <div class="form-row">
            <div class="form-group col-md-12">
                <button id="buttonAddNewTeacher" type="submit" class="btn btn-primary pull-righ" onclick="addNewTeacher()">Add New Teacher</button>
            </div>
        </div>

        <div id="form-container" class="form-row brisk-form formConfig"></div>

        <div id="form-template">
            <div class="form-row">
                <div class="form-group col-md-2">
                    <label for="id">ID</label>
                    <input type="text" class="form-control" id="id" placeholder="ID" readonly>
                    <input type="hidden" class="form-control" id="hash">
                </div>
                <div class="form-group col-md-5">
                    <label for="firstName">First Name</label>
                    <input
                            type="text"
                            class="form-control"
                            id="firstName"
                            placeholder="First Name"
                            oninput="$('#buttonUpdate').show(); $('#buttonAdd').show(); $('#buttonDelete').show();"
                    >
                </div>
                <div class="form-group col-md-5">
                    <label for="lastName">Last Name</label>
                    <input
                            type="text"
                            class="form-control"
                            id="lastName"
                            placeholder="Last Name"
                            oninput="$('#buttonUpdate').show(); $('#buttonAdd').show(); $('#buttonDelete').show();"
                    >
                </div>
            </div>
            <div class="form-row">
                <div class="form-group col-md-2">
                    <label for="age">Age</label>
                    <input
                            type="text"
                            class="form-control"
                            id="age"
                            placeholder="yy"
                            oninput="$('#buttonUpdate').show(); $('#buttonAdd').show(); $('#buttonDelete').show();"
                    >
                </div>
                <div class="form-group col-md-5">
                    <label for="birthday">Birthday</label>
                    <input
                            type="text"
                            class="form-control"
                            id="birthday"
                            placeholder="yyyy-dd-mm"
                            oninput="$('#buttonUpdate').show(); $('#buttonAdd').show(); $('#buttonDelete').show();"
                    >
                </div>
                <div class="form-group col-md-5">
                    <label for="cellPhone">Cell Phone</label>
                    <input
                            type="text"
                            class="form-control"
                            id="cellPhone"
                            placeholder="+xx (xxx) xxx-xxxx"
                            oninput="$('#buttonUpdate').show(); $('#buttonAdd').show(); $('#buttonDelete').show();"
                    >
                </div>
            </div>
            <div class="form-row">
                <div class="form-group col-md-12">
                    <label for="notes">Notes</label>
                        <textarea
                                class="form-control"
                                id="notes"
                                rows="4"
                                placeholder="Notes"
                                oninput="$('#buttonUpdate').show(); $('#buttonAdd').show(); $('#buttonDelete').show();"
                        ></textarea>
                </div>
                <div class="form-group col-md-12">
                    <label for="terms">Terms</label>
                        <textarea
                                class="form-control"
                                id="terms"
                                rows="4"
                                placeholder="Terms"
                                oninput="$('#buttonUpdate').show(); $('#buttonAdd').show(); $('#buttonDelete').show();"
                        ></textarea>
                </div>
            </div>
            <button id="buttonUpdate" type="submit" class="btn btn-primary" onclick="onButtonUpdate()">Update</button>
            <button id="buttonAdd" type="submit" class="btn btn-primary" onclick="onButtonAdd()">Add</button>
            <button id="buttonDelete" type="submit" class="btn btn-danger" onclick="onButtonDelete()">Delete</button>
        </div>

        <script src="https://rawgit.com/deepidea/brisk-table/master/brisk-table.js"></script>
    </body>
</html>
```
[`Demo`](https://deepidea.github.io/brisk-table/examples/real-application.html)