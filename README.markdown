# jQuery Clockwinder

Clockwinder is a simple jQuery plugin for displaying relative times in web applications. Using Clockwinder, you can easily provide relative times (e.g. `10 minutes ago`) purely using Javascript. Essentially, Clockwinder encapsulates the functionality of [Rails's time_ago_in_words][1] in Javascript with convenience methods for automatically keeping things up to date. The actual `time_ago_in_words` Javascript code came from [this blog post][2].

## Usage

Simply add the Clockwinder javascript to your project somewhere and include it in your page (after jQuery):

    <script src="/javascripts/jquery.clockwinder.js" type="text/javascript" charset="utf-8"></script>

Then call it on whatever elements you want to be kept up to date. By default, it will take the contents of the `datetime` attribute on the specified elements and use that as a basis for the relative time.

    // Apply Clockwinder to all <time> tags with a 'relative' class
    $('time.relative').clockwinder();

Now load the page and watch the times update themselves!

## Options

Call via `$(element).clockwinder({ /* Options here... */})`

* **postfix**: The postfix is what will be appended to the relative time text. Defaults to `'ago'`.
* **displayFunction**: If you wish to display the time in a custom way, this function will be called each time the time is updated with `this` scoped to the element that's being updated and arguments of `newTime` (the newest time string calculated) and `options` (the options that were passed to Clockwinder).
* **interval**: Specify how often Clockwinder updates times (in milliseconds). Defaults to 30 seconds.
* **timeInDays**: When true, leaves off the time. For example, it will print '11/30/2011' instead of '11/30/2011 at 11:30 pm'. Defaults to `false`.
    

[1]:http://api.rubyonrails.org/classes/ActionView/Helpers/DateHelper.html#M002262
[2]:http://nullstyle.com/2007/06/02/caching-time_ago_in_words/