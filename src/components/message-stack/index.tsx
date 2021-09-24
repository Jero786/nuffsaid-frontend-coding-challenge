import React, {memo, ReactElement} from 'react';

import {Style, Subtitle, Title} from "./styles";
import {Priority, UniqueMessage} from "types";
import {MessageCard} from "./message-stack-card";

type Props = Readonly<{
    title: string;
    priority: Priority;
    labelCount?: string;
    onClick: (title: string, priority: Priority) => void;
    children: ReactElement | ReactElement[];
}>

const MessageStack: React.FC<Props> = memo(({
  title,
  labelCount = "Count",
  children,
  onClick,
  priority,
}) =>
    <Style>
        <Title>{title}</Title>
        <Subtitle>{labelCount} {React.Children.count(children)}</Subtitle>
        {React.Children.map(children, (child: ReactElement) => {
            return React.cloneElement(child, {
                onClick: () => onClick(child.props.title, priority)
            });
        })}
    </Style>
);

type StackMessageListProps = Readonly<{
    handlerClearMessage: (messageId: string, priority: Priority) => void;
    messages: UniqueMessage[];
    title: string;
    priority: Priority;
}>

const MessageStackList: React.FC<StackMessageListProps> = memo(({
  priority,
  title,
  messages,
  handlerClearMessage
}) =>
    <MessageStack
        priority={priority}
        title={title}
        onClick={handlerClearMessage}>
        {messages
            .map(msg => {
                return <MessageCard
                    key={msg.uniqueId}
                    type={priority}
                    title={msg.message}
                />
            })}
    </MessageStack>
);

MessageStackList.displayName = 'MessageStackList';
MessageStack.displayName = 'MessageStack';

export {
    MessageStack,
    MessageStackList,
}

