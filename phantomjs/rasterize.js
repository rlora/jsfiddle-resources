var page = new WebPage(),
    address, output, size;

if (phantom.args.length < 2 || phantom.args.length > 3) {
    console.log('Usage: rasterize.js URL filename');
    phantom.exit();
} else {
    address = phantom.args[0];
    output = phantom.args[1];
    page.viewportSize = { width: 800, height: 600 };
    page.includeJs("http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js", function() {
        console.log('jquery loaded successfully');
        page.open(address, function (status) {
            if (status !== 'success') {
                console.log('Unable to load the address!');
            } else {
                page.evaluate(function () {
                    $('div').css('border-color', 'white').css('background-color', 'black');
                    $('p').css('background-color', 'transparent').css('color', 'transparent');
                    $('div').css('border-color', 'red');
                    $('body').css('background-color', 'lime')
                });
                window.setTimeout(function () {
                    page.render(output);
                    phantom.exit();
                }, 200);
            }
        });
    });
}
