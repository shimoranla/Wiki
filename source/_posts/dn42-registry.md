---
title: DN42 实验网络注册指北
comments: true
toc: true
donate: true
share: true
date: 2025-08-01 10:51:11
categories:
tags: Network
cover: "/assets/yuehuawu.jpg"
---

# 开始之前必读

不建议更改除了必须要更改地地方，不然可能推上去检查报错导致努力白费。

DN42 网络不提供网络出口，也不提供绕过国内审查的功能！！

在注册 DN42 之前，请确保你已经可以熟练的运用 Git 等工具，并有能力操作 Linux 系统（非图形化版本）。

DN42 网络基本模拟了真实的互联网自治系统注册流程，所以总体比较繁琐（本人弄了快一个小时才完成这些注册流程）。

DN42 注册需要签名，GPG 或 SSH 均可。

请注意，在中国大陆内使用 DN42 网络和国外服务器进行 Peer 违反了[《中华人民共和国计算机信息网络国际联网管理暂行规定 》](https://www.cac.gov.cn/1996-02/02/c_126468621.htm)的第六条，请自行衡量可能的法律风险。

Windows 用户注册建议使用 WSL 完成，或者使用虚拟机，DN42 的 Registry 存储库含有 NTFS 不能处理的特殊字符。

建议在操作过程中使用魔法，会节约不少时间。

教程可能随时过时，所以仅供参考。

[DN42 官方的注册指南](https://git.dn42.dev/dn42/registry/src/branch/master/README.md)

[DN42 官方的 Git 操作指南（如何创建 Pull Request）](https://git.dn42.dev/dn42/registry/src/branch/master/README.md)

你也可以看看[前辈的课本](https://lantian.pub/article/modify-website/dn42-experimental-network-2020.lantian/)，比我写的更专业点。

# 前置工作

因为 DN42 网络注册使用 Git 进行管理，所以你必须注册一个账号。

[DN42 的 Gitea 服务器地址](https://git.dn42.dev/)


注册完成账号后，你需要转到 [DN42 的 Registry](https://git.dn42.dev/dn42/registry)，然后点派生 Fork 一份存储库到个人账号下。

Fork 完成后，使用 Git 拷贝个人账号下的远程存储库到本地，进入存储库，然后使用如下命令配置 Git 使用的用户名和邮箱

```bash
git config user.name <你的用户名>

git config user.email <注册账户使用的电子邮件地址>
```

因为 DN42 需要对提交签名，所以你需要生成 SSH/GPG 的公钥。

密钥选一个就行，不用都生成。

## 创建 GPG 密钥

使用此命令生成新的 GPG 密钥

```bash
gpg --full-generate-key
```

会提供 6 中密钥类型让你选择，这里按 Enter 选默认的 ECC 公钥。

然后会让你选密钥生成算法，这里按 Enter 选择默认的 ECC 算法。

第三步选择密钥过期时间，输入纯数字是天数，后面加个 w 就是星期，以此类推需要月就是 m 年就是 y。

按下回车后会让你确认，输入 y 就行。

接下来就是填写信息。

之后会让你设置安全密钥的密码（出于安全考虑，TUI 环境下密码默认不显示，不是 Bug，注意别打错了），如果你确信密钥不会泄露可以不填。

创建完成后使用如下命令列出你的密钥。

```bash
gpg --list-keys
```

复制密钥的 ID，然后使用如下命令将你的公钥发送到密钥服务器。

```bash
gpg --keyserver hkp://keyserver.ubuntu.com --send-key [密钥 ID]
```

当然大陆网络环境嘛..... 懂的都懂，你的提交可能会因为网络问题失败。

你可以选择魔法、换一个密钥服务器，或者导出你的 Key 然后使用魔法访问 keyserver.ubuntu.com，通过网页端提交 Key。

## 创建 SSH 密钥

使用如下命令创建 SSH 密钥

```bash
ssh-keygen -t ed25519
```

会问你保存位置，一般情况下默认就好。

然后会要求输入密钥的保护密码（出于安全考虑，TUI 环境下密码默认不显示，不是 Bug，注意别打错了），你也可以按 Enter 留空。

# 正式流程

## 创建 Mntner 文件

前置工作完成后，进入存储库文件夹，先在 `data/mntner` 下面创建一个 `[名称]-MNT` 文件。

请注意替换文本。

```
mntner:             [名称]-MNT
admin-c:            [名称]-DN42
tech-c:             [名称]-DN42
mnt-by:             [名称]-MNT
source:             DN42
auth:               [密钥]
remarks:            [这里填备注]
```

各个字段的解释如下:

- mntner: 即 Maintainer，维护者，指这个网络由谁维护。

- admin-c: 即 Admin Contact，管理员联系信息，指向后续创建的 Person 文件，一般为 [名称]-DN42。

- tech-c: 即 Tech Contact，技术员联系信息，指向后续创建的 Person 文件，一般也为 [名称]-DN42。

- mnt-by：即 maintain by，由谁维护，指向这个账户本身，一般为 [昵称]-MNT。

- source：固定值 DN42。

- auth: 认证方式，GPG 密钥格式为 `pgp-fingerprint [密钥 ID]`，SSH 填写密钥内容。

- remarks: 备注

<details>

<summary>以下是我注册填写的文件，仅供参考，请勿照抄！ [点击查看]</summary>

```
mntner:             BOXIMENGLING-MNT
admin-c:            BOXIMENGLING-DN42
tech-c:             BOXIMENGLING-DN42
mnt-by:             BOXIMENGLING-MNT
source:             DN42
auth:               pgp-fingerprint D5C967B98F07AD0698265595EBB2DB5EFCD3D764
remarks:            LuoTianyi
```

</details>

## 创建 Person 文件

填写完成后，你需要在 `data/person` 下面创建一个 `[名称]-DN42` 文件。

```
person:             [这里填名称]
e-mail:             [电子邮件地址]
contact:            [可选，填你的社交平台，格式为 [平台]:[用户标识符]]
nic-hdl:            [名称]-DN42
mnt-by:             [名称]-MNT
source:             DN42
```

各个字段的解释如下

- person: 你的名字

- e-mail: 电子邮件地址

- contact: 其他联系方式，比如 Telegram，填写为 telegram:[用户名]

- nic-hdl：NIC handle，指向文件本身，即 [昵称]-DN42。

- mnt-by：maintain by，由谁维护，指向你之前创建的 MNT 文件，[昵称]-MNT。

- source：固定值 DN42。

<details>

<summary>以下是我注册填写的文件，仅供参考，请勿照抄！ [点击查看]</summary>

```
person:             Boxi Mengling
e-mail:             boximengling@outlook.com
contact:            telegram:boximengling
nic-hdl:            BOXIMENGLING-DN42
mnt-by:             BOXIMENGLING-MNT
source:             DN42
```

</details>

## 选择 ASN

填写完成后，你需要一个 ASN。

- 如果你在公共互联网上有自己的 ASN 的话。

    首先让我膜拜一下大佬。

    然后你可以把自己的 ASN 填进去，DN42 网络的管理员验证确认这个 ASN 归你所有后，就会批准你的请求。

    不过据说比较麻烦，还容易端口冲突，不如自己弄个 DN42 的 ASN。

- 如果你在公网没有 ASN 或者不想接入 DN42 使用。

    你可以在这里选择 DN42 自己的 ASN，截止到 2022 年 DN42 开放注册的 ASN 范围是 4242420000 - 4242423999，共计 4000 个。

    建议通过[区块浏览器](https://explorer.burble.com/free#/asn)选一个空闲的 ASN。

然后在 `data/aut-num` 创建文件名为 ASN 编号 的文件，写入如下内容

```
aut-num:            [你选的 ASN]
as-name:            [昵称]-AS
descr:              [备注]
admin-c:            [名称]-DN42
tech-c:             [名称]-DN42
mnt-by:             [名称]-MNT
source:             DN42
```

各个字段的解释如下

- aut-num：AS 编号（ASN）。

- as-name：AS 的名称，一般只在 DN42 的一些网络结构示意图中看到。这里设置为 [昵称]-AS。

- descr：AS 简介，一般只在结构图中看到，随意填写。
    
- admin-c：Admin Contact，管理员联系信息，指向你创建的 Person 文件，[昵称]-DN42。

- tech-c：Tech Contact，技术员联系信息，指向你创建的 Person 文件，[昵称]-DN42。

- mnt-by：Maintain by（由谁维护），由谁维护，指向你创建的的 MNT 文件，[昵称]-MNT。

- source：固定值 DN42。

<details>

<summary>以下是我注册填写的文件，仅供参考，请勿照抄！ [点击查看]</summary>

```
aut-num:            AS4242422162
as-name:            BOXIMENGLING-AS
descr:              LuoTianyi
admin-c:            BOXIMENGLING-DN42
tech-c:             BOXIMENGLING-DN42
mnt-by:             BOXIMENGLING-MNT
source:             DN42
```

</details>

## 选择 IPv4 地址

DN42 网络使用的 IPv4 地址是 172.20.0.0/14，也就是 172.20.0.0-172.23.255.255。

但是但是，因为有些地址是保留给其他用途的，你不能申请，所以直接从文件内选一块地址不太方便，建议还是用[区块浏览器](https://explorer.burble.com/free#/4)选个空闲的 IPv4。

DN42 最小可申请的 IPv4 地址块是 /29，即 8 个 IPv4 地址，去掉网络地址和广播地址，可提供 6 个可用的 IPv4 地址。

DN42 网络的建议分配是 /27，也就是 32 个 IPv4 地址，去掉网络地址和广播地址，可提供 30 个可用的 IPv4 地址。

你可以直接申请的最大地址块是 /26，可提供 64 个 IPv4 地址，同样去掉网络地址和广播地址，可提供 62 个可用的 IPv4 地址。

如果你的设备很多，超过 62 个，需要更大的 IPv4 地址块，那么

-  首先让我膜拜一下大佬。

-  然后你的注册请求不会被马上批准，你需要联系到 DN42 的其他成员，告诉大家你需要更大的 IPv4 分配并阐明理由，请求大家投票。

-  联系方式可以在[这里找](https://wiki.dn42.us/contact)

-  但是但是，不建议一上来就申请这么大的分配。

-  可以先找一块 /24 段余量比较多的，然后申请其中的 /27 段，等后面有需要了再继续调整或者扩大分配，这样比较容易被批准。

-  另外，千万不要占着 /24 不用！！！

-  DN42 的 IPv4 地址和公网一样珍贵。

选好 IPv4 地址块后，在 `data/inetnum` 下建一个新建地址块，比如如果你选 172.22.167.190/27 那么文件名就是 172.22.167.190_27，然后填写这个文件。

如果你不会写，可以选择把文件、地址、名称喂给 AI 让 AI 帮你写。

```
inetnum:            [你选的 IPv4 地址块的网络地址] - [广播地址]
netname:            [名称]-IPV4
remarks:            [随便写，你也可以在这里写联系信息请求别人和你 Peer]
descr:              [随便写]
country:            [国家代码]
admin-c:            [名称]-DN42
tech-c:             [名称]-DN42
mnt-by:             [名称]-MNT
nserver:            [反向解析服务器]
status:             ASSIGNED
cidr:               [CIRID 形式的 Inetnum]
source:             DN42
```

各个字段的解释如下


-   inetnum：地址块的范围，也就是网络地址 - 广播地址。
-   netname：地址块名称，基本没用，可以随便取（但一般建议保持 [昵称]-IPV4 格式）。
-   remarks：随意填写。
-   descr：随意填写。
-   country：国家/地区代号，比如中国大陆是 CN，中国香港是 HK，美国是 US。
-   admin-c：admin contact，管理员联系信息，指向你的 Person 文件，[昵称]-DN42。
-   tech-c：Tech Contact，技术员联系信息，指向你的 Person 文件，[昵称]-DN42。
-   mnt-by：Maintain by，由谁维护，指向你之前的 MNT 文件，[昵称]-MNT。
-   nserver：反向解析服务器，如果看不懂那么你大概率不需要，删掉就行。
-   status：固定值 ASSIGNED。
-   cidr：CIRD 形式的 Inetnum。
-   source：固定值 DN42。

<details>

<summary>以下是我注册填写的文件，仅供参考，请勿照抄！ [点击查看]</summary>

```
inetnum:            172.20.167.192 - 172.20.167.223
netname:            BOXIMENGLING-IPV4
remarks:            LuoTianyi
descr:              LuoTianyi
country:            CN
admin-c:            BOXIMENGLING-DN42
tech-c:             BOXIMENGLING-DN42
mnt-by:             BOXIMENGLING-MNT
status:             ASSIGNED
cidr:               172.20.167.192/27
source:             DN42
```

</details>

到此 IPv4 配置还没结束，你需要同时配置 route 以授权你的 ASN 使用这个 IPv4 地址。

在 `data/route` 同名文件，写入如下文本。

```
route:              [CRID 格式的 Inetnum]
descr:              [随便填]
origin:             [AS 编号]
mnt-by:             [名称]-MNT
source:             DN42
```

各个字段的解释如下

- route: CRID 格式的 Inetnum，也就是 xxx.xxx.xxx.xxx/xx 这种。

- descr: 备注，随便填。

- origin：授权给哪个 AS 使用这个地址块，填你自己的 AS 编号。

- mnt-by: 由谁维护，指向你的 MNT 文件。

- source: 固定值 DN42

<details>

<summary>以下是我注册填写的文件，仅供参考，请勿照抄！ [点击查看]</summary>

```
route:              172.20.167.192/27
descr:              LuoTianyi
origin:             AS4242422162
mnt-by:             BOXIMENGLING-MNT
source:             DN42
```

</details>

## 选择 IPv6 地址

鉴于现在是 2025 年，大多数运营商分配/自购的猫、家庭网关、路由器符合新的国标，支持 IPv6 网络，所以最好同时申请 IPv6 地址。

DN42 的 IPv6 地址在 fd00::/8 范围，是私有 IPv6。

DN42 IPv6 分配是 /48，足够任何人使用的（这可是可以给全球每一粒沙子都分配一个地址的 IPv6）。

-  就算你的设备只支持 /64，一个 /48 可以划出 65535 个 /64，你可以和每个 DN42 成员都 Peer 过去。

你可以用[区块浏览器](https://explorer.burble.com/free#/6)生成随机的空闲 IPv6。

你可能会想要自定义 IPv6 地址，写一些特殊纪念意义的东西进去。

-  首先，这是可以的。

-  但是但是，如果你这样做就违反了 RFC 4193 中规定的 IPv6 ULA 地址应该随机生成，以确保全局唯一不冲突。

-  因为 DN42 拿不到其他 IPv6 地址的分配情况，你自定义的地址可能与公共互联网的地址冲突。

-  如果你和别人 Peer 时你的地址和对方的其他网络冲突了，你需要重新编排网络内的全部 IPv6 地址，以确保冲突解决（讲真的，这看起来可不好玩）。

-  然后，DN42 各个管理员对自定义地址的态度不一样，有的人申请到了，但是有的人被拒绝了。

如果你确实想要自定义 IPv6 地址，在执行合并操作前，管理员会询问确保你确实想要自定义地址。

>Your inet6num violates RFC4193 section 3.2. Are you fully aware of the consequences and do you really want to continue? Being forced to renumber your whole network really isn't fun.

如果你确实认为需要自定义地址，就回复 Yes, I'm sure。

待确认 IPv6 地址后，需要在 `/data/inet6num` 建立对应的 IPv6 地址块文件。

格式如下

```
inet6num:           [同样的网络地址 - 广播地址]
netname:            [名称]-IPV6
descr:              [备注]
country:            [国家/地区代码]
admin-c:            [名称]-DN42
tech-c:             [名称]-DN42
mnt-by:             [名称]-MNT
nserver:            [反向解析服务器]
status:             ASSIGNED
cidr:               [CRID 格式的 IPv6 地址]
source:             DN42
```

各个字段的解释如下


-   inetnum：地址块的范围，也就是网络地址 - 广播地址。
-   netname：地址块名称，基本没用，可以随便取（但一般建议保持 [昵称]-IPV4 格式）。
-   remarks：随意填写。
-   descr：随意填写。
-   country：国家/地区代号，比如中国大陆是 CN，中国香港是 HK，美国是 US。
-   admin-c：admin contact，管理员联系信息，指向你的 Person 文件，[昵称]-DN42。
-   tech-c：Tech Contact，技术员联系信息，指向你的 Person 文件，[昵称]-DN42。
-   mnt-by：Maintain by，由谁维护，指向你之前的 MNT 文件，[昵称]-MNT。
-   nserver：反向解析服务器，如果看不懂那么你大概率不需要，删掉就行。
-   status：固定值 ASSIGNED。
-   cidr：CIRD 形式的 Inetnum。
-   source：固定值 DN42。

<details>

<summary>以下是我注册填写的文件，仅供参考，请勿照抄！ [点击查看]</summary>

```
inet6num:           fdea:6e46:2f1c:0000:0000:0000:0000:0000 - fdea:6e46:2f1c:ffff:ffff:ffff:ffff:ffff
netname:            BOXIMENGLING-IPV6
descr:              LuoTianyi
country:            CN
admin-c:            BOXIMENGLING-DN42
tech-c:             BOXIMENGLING-DN42
mnt-by:             BOXIMENGLING-MNT
status:             ASSIGNED
cidr:               fdea:6e46:2f1c::/48
source:             DN42
```

</details>

然后需要建立 Route 文件，文件位于 `data/route6` 下

格式如下

```
route6:             [CRID 格式的地址]
descr:              [备注]
origin:             [授权使用的 AS]
mnt-by:             [名称]-MNT
source:             DN42
```


各个字段的解释如下

- route: CRID 格式的 Inetnum，也就是 xxxx:xxxx:xxxx::/xx 这种。

- desct: 备注，随便填。

- origin：授权给哪个 AS 使用这个地址块，填你自己的 AS 编号。

- mnt-by: 由谁维护，指向你的 MNT 文件。

- source: 固定值 DN42

<details>

<summary>以下是我注册填写的文件，仅供参考，请勿照抄！ [点击查看]</summary>

```
route6:             fdea:6e46:2f1c::/48
descr:              LuoTianyi
origin:             AS4242422162
mnt-by:             BOXIMENGLING-MNT
source:             DN42
```

</details>

至此你已经完成了 DN42 网络的大部分注册流程。

## 检查文件格式

由于 DN42 尽可能的模拟的现实注册流程，因此对格式有严格要求。

你可以使用如下命令检查文件格式（需要在仓库根目录做这个）。

```
sh ./check-my-stuff
```

如果没有报错，则你的文件不存在格式问题，大概率可以一次过审。

但是报错了也没关系，你可以试试如下命令尝试修复文件格式。

```
sh ./fmt-my-stuff
```

如果没有解决的话，你可能需要根据报错信息重走部分流程。

## 推送仓库

### GPG 签名

在推送之前，我们需要保存本地更改，如果你使用 GPG 则必须配置 Git 签名。

```bash
git config user.signingkey <密钥 ID>
```

然后使用如下命令进行提交。

```bash
git add .
git commit -S -m "提交信息"
```

### SSH 签名

对于 SSH 签名，你需要使用 git log 查看你提交的 Hash。

然后使用如下命令进行签名。

```bash
echo <commit hash> | ssh-keygen -Y sign -f ~/.ssh/id_ed25519 -n dn42
```

然后将结果附在 PR Description 中。

### 更新本地分支

因为整个注册流程非常繁琐以至于需要消耗大量时间，在完成期间远程分支可能会有更新，你需要同步这些更改

使用如下命令同步更改。

```
git fetch origin master && git checkout <你的用户名>/register && git rebase -i -S origin/master
```

### 推送

使用如下命令推送。

```bash
git push
```

## 发送注册请求

转到 DN42 Registry 存储库，找到合并请求选项卡，然后点击创建合并请求。

将来源设置成账号下的存储库，然后点击创建。

### 注意事项

1.请使用英文。

2.一个 PR 不能包含多于一个 Commit，如果你创建了两个 Commit，请使用 `bash ./squash-my-commits`，然后通过 `git push -f` 强制推送到远程存储库（不加 -f 会被 rejected）。

3.如果管理员要求更改，请按照说明更改然后推送到存储库（不要重开 PR）。

# 结束

如果没有意外的话，PR 会在一至两天内被合并。

然后你就可以拿着新新分配的 IP 去和别人 Peer 一下。
