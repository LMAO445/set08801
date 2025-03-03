function init()
{
    document.title ="OnLoad Event"
    var btn = document.createElement('button');
    btn.id ='Hellobtn'
    btn.innerText='Hello';
    var body = document.getElementsByTagName('body')[0]
    body.appendChild(btn);
    btn.onclick = function()
    {
        let text= document.createTextNode("Napier");
        body.appendChild(text);
    };
}
window.onload=init;