(function($){
    $.ajax({
      url: "https://dejero.atlassian.net/s/d41d8cd98f00b204e9800998ecf8427e-T/vzcsfp/b/1/3d70dff4c40bd20e976d5936642e2171/_/download/batch/com.atlassian.jira.collector.plugin.jira-issue-collector-plugin:issuecollector-embededjs/com.atlassian.jira.collector.plugin.jira-issue-collector-plugin:issuecollector-embededjs.js?locale=en-UK&collectorId=ef802abc",
      type: "get",
      cache: !0,
      dataType: "script",
      success: function() {
        var mytimer = setTimeout(function() {
          $("#atlwdg-trigger").trigger("click");
          $("#atlwdg-trigger").hide();
        }, 1000);
      }
    });
    })(jQuery);