# queryと主キーが一致するmodelがあれば返す．なければNoneを返す．
def get_or_none(model, query):
    try:
        return model.objects.get(pk=query)
    except:
        return None
