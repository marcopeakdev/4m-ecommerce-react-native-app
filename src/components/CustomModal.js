import React, {
  useState,
  useEffect,
  useRef,
  useContext
} from 'react';
import {
  Button,
  Heading,
  Text,
  VStack,
  Modal
} from 'native-base';

const CustomModal = props => {
  const {
    headingText,
    bodyText,
    confirmOnPress,
    cancelOnPress,
    confirmText,
    cancelText,
    isOpen,
    toggleIsOpen
  } = props;

  useEffect(() => {
    setAlertOpen(isOpen);
  }, [isOpen]);

  const [alertOpen, setAlertOpen] = useState(isOpen);
  const onAlertClose = () => toggleIsOpen();
  const cancelRef = useRef(null);

  return (
    <>
      <Modal
        isOpen={alertOpen}
        onClose={onAlertClose}
        _backdrop={{
          opacity: 0.5
        }}
        position="absolute"
        h="100%"
        w="100%"
        left="0"
        top="0"
        px="4"
      >
        <Modal.Content borderRadius={15} width="100%" p="4">
          <Modal.Body pb={1}>
            <VStack space="6">
              <VStack>
                {headingText && (
                  <Heading textAlign={'center'}>
                    {headingText}
                  </Heading>
                )}
                {bodyText && (
                  <Text textAlign={'center'}>
                    {bodyText}
                  </Text>
                )}
              </VStack>
              <VStack space="4">
                {confirmOnPress && (
                  <Button
                    variant="purple"
                    onPress={() => {
                      onAlertClose();
                      confirmOnPress();
                    }}
                    _disabled={{
                      bg: 'brand.lightGrayOnBlack',
                      opacity: 1,
                      _text: { opacity: 0.4 }
                    }}
                  >
                    {confirmText ? confirmText : 'Continue'}
                  </Button>
                )}
                {cancelOnPress && (
                  <Button
                    variant="secondary"
                    onPress={() => {
                      cancelOnPress();
                      onAlertClose();
                    }}
                  >
                    {cancelText ? cancelText : 'Cancel'}
                  </Button>
                )}
              </VStack>
            </VStack>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </>
  );
};

export default CustomModal;
