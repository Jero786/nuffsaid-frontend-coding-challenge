import React, {memo} from "react";
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import CardContent from '@mui/material/CardContent';

import {CardContainer, cardStyle, ButtonContainer} from "./styles";
import {Priority} from "types/index.d";

type Props = Readonly<{
    type?: Priority;
    title: string;
    labelClear?: string;
    onClick?: () => void;
}>;

const MessageCard: React.FC<Props> = memo(({
  title,
  onClick,
  type = Priority.Info,
  labelClear = "Clear"
}) =>
    <CardContainer type={type}>
        <Card>
            <CardContent style={cardStyle(type)}>
                {title}
                <ButtonContainer>
                    <Button style={{
                        color: 'black',
                        fontWeight: 400,
                        textTransform: 'capitalize'
                    }} onClick={onClick}>{labelClear}</Button>
                </ButtonContainer>
            </CardContent>
        </Card>
    </CardContainer>
);

MessageCard.displayName = 'MessageCard';

export {
    MessageCard
}