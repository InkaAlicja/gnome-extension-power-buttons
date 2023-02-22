const St = imports.gi.St;
const Main = imports.ui.main;
const GLib = imports.gi.GLib;

function powerOff() {
    try {
        var value = GLib.spawn_command_line_async('gnome-session-quit --power-off');
    } catch (err) {
        Main.notify(err + ": gnome-extension-poweroff-button@InkaAlicja experienced an error");
        log("inka:" + err);
    }
}

function suspend() {
    try {
        var value = GLib.spawn_command_line_async('systemctl suspend');
    } catch (err) {
        Main.notify(err + ": gnome-extension-poweroff-button@InkaAlicja experienced an error");
    }
}

let powerOffButton;
let sleepButton;
let powerOffIcon;

function init () {
    powerOffIcon = new St.Icon({
        icon_name: 'system-shutdown',
        style_class: 'system-status-icon'
    });

    powerOffButton = new St.Bin({
        style_class: 'panel-button',
        reactive: true,
        can_focus: true,
        track_hover: true
    });

    powerOffButton.set_child(powerOffIcon);
    powerOffButton.connect('button-press-event', powerOff);

    suspendIcon = new St.Icon({
        icon_name: 'media-playback-pause',
        style_class: 'system-status-icon'
    });

    suspendButton = new St.Bin({
        style_class: 'panel-button',
        reactive: true,
        can_focus: true,
        track_hover: true
    });

    suspendButton.set_child(suspendIcon);
    suspendButton.connect('button-press-event', suspend);
}
function enable () {
    Main.panel._rightBox.insert_child_at_index(suspendButton, -1);
    Main.panel._rightBox.insert_child_at_index(powerOffButton, -1);
}
function disable() {
    Main.panel._rightBox.remove_child(suspendButton);
    Main.panel._rightBox.remove_child(powerOffButton);
}
