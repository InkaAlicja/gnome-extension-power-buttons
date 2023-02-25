const St = imports.gi.St;
const Main = imports.ui.main;
const GLib = imports.gi.GLib;

function powerOff() {
    try {
        var value = GLib.spawn_command_line_async('gnome-session-quit --power-off');
    } catch (err) {
        Main.notify(err + ": gnome-extension-poweroff-button@InkaAlicja experienced an error");
        log("gnome-extension-poweroff-button@InkaAlicja:" + err);
    }
}

function suspend() {
    try {
        var value = GLib.spawn_command_line_async('systemctl suspend');
    } catch (err) {
        Main.notify(err + ": gnome-extension-poweroff-button@InkaAlicja experienced an error");
        log("gnome-extension-poweroff-button@InkaAlicja:" + err);
    }
}

let powerOffButton;
let powerOffIcon;
let suspendIcon;
let suspendButton;

let powerOffConnection;
let suspendConnection;

function init () {}

function enable () {
    powerOffIcon = new St.Icon({
        icon_name: 'system-shutdown-symbolic',
        style_class: 'system-status-icon'
    });

    powerOffButton = new St.Bin({
        style_class: 'panel-button',
        reactive: true,
        can_focus: true,
        track_hover: true
    });

    powerOffButton.set_child(powerOffIcon);
    powerOffConnection = powerOffButton.connect('button-press-event', powerOff);

    suspendIcon = new St.Icon({
        icon_name: 'weather-clear-night-symbolic',
        style_class: 'system-status-icon'
    });

    suspendButton = new St.Bin({
        style_class: 'panel-button',
        reactive: true,
        can_focus: true,
        track_hover: true
    });

    suspendButton.set_child(suspendIcon);
    suspendConnection = suspendButton.connect('button-press-event', suspend);

    Main.panel._rightBox.insert_child_at_index(suspendButton, -1);
    Main.panel._rightBox.insert_child_at_index(powerOffButton, -1);
}

function disable() {
    Main.panel._rightBox.remove_child(suspendButton);
    Main.panel._rightBox.remove_child(powerOffButton);

    if(powerOffIcon) {
        powerOffIcon.destroy();
        powerOffIcon = null;
    }
    if(powerOffButton) {
        if(powerOffConnection){
            powerOffButton.disconnect(powerOffConnection);
            powerOffConnection = null;
        }
        powerOffButton.destroy();
        powerOffButton = null;
    }
    if(suspendIcon) {
        suspendIcon.destroy();
        suspendIcon = null;
    }
    if(suspendButton) {
        if(suspendConnection){
            suspendButton.disconnect(suspendConnection);
            suspendConnection = null;
        }
        suspendButton.destroy();
        suspendButton = null;
    }

}
