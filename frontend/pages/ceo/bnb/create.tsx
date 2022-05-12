import React, { useCallback, useState } from "react";
import { WideButton } from "../../../components/WideButton";
import { Container, Wrapper } from "../../../styles/Basic";
import InputForm from "../../../components/ceo/InputForm";
import ImageForm from "../../../components/ceo/ImageForm";
import PostCode from "../../../components/ceo/Postcode";
import Switches from "../../../components/ceo/Switches";
import { useRouter } from "next/router";
import { CeoBnbCreate } from "../../../api/ceo";
import Header from "../../../components/Header";
import styled from "styled-components";

export interface IValues {
  name: string;
  description: string;
  price: number | string;
  people: number | string;
  isGarden: boolean;
  isCooking: boolean;
}

export interface IImages {
  files: File;
  previewURL: string;
}

const ContentsWrapper = styled(Wrapper)`
  justify-content: flex-start;
  padding-top: 1rem;
`;

const BnbCreate = () => {
  const [values, setValues] = useState<IValues>({
    name: "",
    description: "",
    price: "",
    people: "",
    isGarden: false,
    isCooking: false,
  });
  const [address, setAddress] = useState<String>("");
  const [addressDetail, setAddressDetail] = useState<String>("");
  const [images, setImages] = useState<Array<IImages>>([]);
  const [onScriptLoad, setOnScriptLoad] = useState<boolean>(false);

  const router = useRouter();
  const onClick = useCallback(() => {
    if (!address) {
      alert("주소를 입력해주세요.");
      return;
    }

    // 1. api 전송
    const form = new FormData();
    const dto = {
      loc: `${address} ${addressDetail}`,
      price: values.price,
      cnt: values.people,
      garden: values.isGarden ? "T" : "F",
      cooking: values.isCooking ? "T" : "F",
      contents: values.description,
      name: values.name,
    };
    form.append(
      "dto",
      new Blob([JSON.stringify(dto)], {
        type: "application/json",
      })
    );

    images?.map((image) => form.append("image", image.files));

    CeoBnbCreate(
      form,
      ({ data: { id } }: any) => {
        // 2. router push
        router.push(`/ceo/bnb/${id}`);
      },
      (error: Error) => console.log(error)
    );
  }, [router, address, addressDetail, images, values]);

  return (
    <Container>
      <Header title="숙소 등록" />
      <ContentsWrapper>
        <InputForm values={values} setValues={setValues} />
        <Switches values={values} setValues={setValues} />
        <ImageForm images={images} setImages={setImages} />
        <PostCode
          address={address}
          setAddress={setAddress}
          addressDetail={addressDetail}
          setAddressDetail={setAddressDetail}
        />
        <WideButton onClick={onClick} text="숙소 등록하기" />
      </ContentsWrapper>
    </Container>
  );
};

export default BnbCreate;
