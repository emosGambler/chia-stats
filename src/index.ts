import { QMainWindow, QWidget, QLabel, FlexLayout, QPushButton, QIcon } from '@nodegui/nodegui';
import logo from '../assets/logox200.png';
import { exec } from "child_process";
import { stringify } from 'node:querystring';

const win: QMainWindow = new QMainWindow();
const centralWidget: QWidget = new QWidget();
const rootLayout: FlexLayout = new FlexLayout();
const button = new QPushButton();

// labels
const componentsInfoLabel: QLabel = new QLabel();
const testLabel = new QLabel();

// pictures
const appLogo: QIcon = new QIcon(logo);

const COMPONENTS_INFO_LABEL_ID: string = "components-info";
const COMPONENTS_INFO_LABEL_VALUE: string = "Components info";

function setup(): void {
  // Window title
  win.setWindowTitle("Chia stats");

  // main element
  centralWidget.setObjectName("myroot");

  // components info
  componentsInfoLabel.setObjectName(COMPONENTS_INFO_LABEL_ID);
}

function setGui(): void {
  centralWidget.setLayout(rootLayout);

  rootLayout.addWidget(componentsInfoLabel);
  rootLayout.addWidget(button);
  rootLayout.addWidget(testLabel);
  win.setCentralWidget(centralWidget);
  win.setStyleSheet(
    `
      #myroot {
        background-color: #009688;
        height: '100%';
        align-items: 'center';
        justify-content: 'center';
      }
      #components-info {
        font-size: 16px;
        font-weight: bold;
        padding: 1;
      }
    `
  );

  componentsInfoLabel.setText(COMPONENTS_INFO_LABEL_VALUE);

  button.setIcon(appLogo);

  testLabel.setInlineStyle(`
    color: black;
  `);

  win.show();
}

function loadStats(): void {
  const commands: string[] = ["ls -la", "sensors"];
  const labels: QLabel[] = [componentsInfoLabel, testLabel];

  executeCommands(commands, labels)
}

function executeCommands(commands: string[], labels: QLabel[]) {
  if (commands.length != labels.length) {
    throw new Error("Commands' number is not equal to labels' number!");
  }
  commands.forEach(cmd => {
    loadCommandOutputToLabel(cmd, testLabel);
  });
}

function loadCommandOutputToLabel(command: string, label: QLabel): void {
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: , ${stderr}`);
      return;
    }
    label.setText(stdout);
  });
}

setup();
setGui();
loadStats();

(global as any).win = win;


