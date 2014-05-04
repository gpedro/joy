{% extends '../layouts/login.swig' %}

{% block title %}
Applications
{% endblock %}

{% block description %}
Authorize the {{ cli.name }} application to access your account
{% endblock %}

{% block content %}
<p>Hey {{ user.name }}!</p>
<p><b>{{ cli.name }}</b> is requesting access to your account.</p>
<p>Do you approve?</p>

<form action="/oauth/authorize/decision" method="post">
  <input name="transaction_id" type="hidden" value="{{ transactionID }}">
  <div>
      <input type="submit" class="pure-button pure-button-success" value="Allow" id="allow">
      <input type="submit" class="pure-button pure-button-error" value="Deny" name="cancel" id="deny">
  </div>
</form>
{% endblock %}