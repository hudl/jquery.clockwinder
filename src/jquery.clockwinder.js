(function ($) {
    $.fn.clockwinder = function (opts) {
        var options = $.extend({
            postfix: 'ago',
            interval: 30000,
            alwaysRelative: false,
            attr: 'datetime',
            timeInDays: false
        }, opts);

        var elements = this;

        setInterval(function () {
            $.clockwinder.update(elements, options);
        }, options.interval);

        $.clockwinder.update(elements, options);

        return this;
    };

    $.clockwinder = {
        update: function (elements, options) {
            elements.each(function () {
                var newTime = $.clockwinder.compute($(this).attr(options.attr), options);

                if (options.displayFunction) {
                    options.displayFunction.call(this, newTime, options);
                } else {
                    $(this).text(newTime, options);
                }

                $(this).trigger('clockwinder.updated');
            });
        },

        compute: function (timeStr, opts) {
            var options = opts || {};
            var then = Date.parse(timeStr);
            var today = new Date();

            var distance_in_milliseconds = today - then;
            var distance_in_minutes = Math.round(Math.abs(distance_in_milliseconds / 60000));

            if (distance_in_minutes < 1440 || options.alwaysRelative) {
                return $.clockwinder.time_ago_in_words(then) + (options.postfix ? ' ' + options.postfix : '');
            }

            then = new Date(then);

            var hour = parseInt(then.getHours());
            var minutes = then.getMinutes() + '';
            var ampm = hour < 12 ? 'am' : 'pm';

            if (hour > 12) {
                hour = hour - 12;
            }
            if (hour == 0) {
                hour = 12;
            }

            if (minutes.length == 1) {
                minutes = '0' + minutes;
            }

            var time = hour + ':' + minutes + ' ' + ampm;

            if (distance_in_minutes > 1440 && distance_in_minutes < 2160) {
                return options.timeInDays ? 'yesterday' : 'yesterday at ' + time;
            }

            var year = then.getFullYear().toString().substr(2);
            var month = then.getMonth() + 1;
            var day = then.getDate() + '';

            if (day.length == 1) {
                day = '0' + day;
            }

            var date = [month, day, year].join('/');
            if (!options.timeInDays) {
                date += ' at ' + time;
            }
            return date;
        },

        time_ago_in_words: function (from) {
            return $.clockwinder.distance_of_time_in_words(new Date().getTime(), from);
        },

        days_ago_in_words: function (from) {
            return $.clockwinder.distance_of_days_in_words(new Date().getTime(), from);
        },

        distance_of_time_in_words: function (to, from) {
            var seconds_ago = Math.floor((to - from) / 1000);
            var minutes_ago = Math.floor(seconds_ago / 60);

            if (minutes_ago == 0) {
                return "about " + seconds_ago + " seconds";
            }
            if (minutes_ago == 1) {
                return "about a minute";
            }
            if (minutes_ago < 45) {
                return "about " + minutes_ago + " minutes";
            }
            if (minutes_ago < 90) {
                return "about an hour";
            }
            var hours_ago = Math.round(minutes_ago / 60);
            if (minutes_ago < 1440) {
                return "about " + hours_ago + " hours";
            }
            if (minutes_ago < 2880) {
                return "about a day";
            }
            var days_ago = Math.round(minutes_ago / 1440);
            if (minutes_ago < 43200) {
                return "about " + days_ago + " days";
            }
            if (minutes_ago < 86400) {
                return "about a month";
            }
            var months_ago = Math.round(minutes_ago / 43200);
            if (minutes_ago < 525960) {
                return "about " + months_ago + " months";
            }
            if (minutes_ago < 1051920) {
                return "about a year";
            }
            var years_ago = Math.round(minutes_ago / 525960);
            return "over " + years_ago + " years";
        },

        distance_of_days_in_words: function (to, from) {
            var days_ago = Math.floor((to - from) / (1000 * 60 * 60 * 24));
            if (days_ago == 0 || from > to) {
                return "today";
            }
            if (days_ago == 1) {
                return "yesterday";
            }
            return "" + days_ago + " days";
        }
    };
})(jQuery);
